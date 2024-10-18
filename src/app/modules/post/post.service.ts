// Import the model
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import PostModel from './post.model';

// Service function to create a new post.
const createPost = async (data: any) => {
  if (!data.images) {
    throw new AppError(400, 'Images Is Required');
  }
  data.isPremium = data.isPremium === 'true';
  const newPost = await PostModel.create(data);
  return newPost;
};

// Service function to retrieve a single post by ID.
const getSinglePost = async (id: string) => {
  return await PostModel.findById(id)
    .populate('user') // Populate the user who created the post
    .populate({
      path: 'comments', // Populate comments
      populate: {
        path: 'user', // Populate the user inside each comment
        model: 'User', // Specify the model if needed
      },
    });
};

// Service function to retrieve multiple post based on query parameters.
const getAllPost = async (query: Record<string, unknown>) => {
  // Build the base query
  let postQuery = PostModel.find()
    .sort('-createdAt') // Initial sort by creation date
    .populate('user') // Populate the user who created the post
    .populate({
      path: 'comments', // Populate comments
      populate: {
        path: 'user', // Populate the user inside each comment
        model: 'User', // Specify the model if needed
      },
    });

  // If query.category is available, filter by category
  if (query.category !== "all" && query.category) {
    postQuery = postQuery.where('category').equals(query.category);
  }

  // Create a new QueryBuilder instance for pagination and searching
  const result = new QueryBuilder(postQuery, query)
    .paginate()
    .search(['title']);

  // Execute the query and get the results
  const posts = await result.modelQuery;

  // If sort parameter is provided, sort the posts based on the count of upvotes
  if (query.sort) {
    posts.sort((a, b) => {
      const upvotesCountA = a.upvotes.length;
      const upvotesCountB = b.upvotes.length;

      return query.sort === 'asc' ? upvotesCountA - upvotesCountB : upvotesCountB - upvotesCountA;
    });
  }

  return posts; // Return the sorted posts
};





// Delete A Post By PostId
const deleteSinglePost = async (id: string) => {
  const result = await PostModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, 'Post Not Found');
  }
  return result;
};

// Upvote Or DownVote A Post Using PostId

const votePost = async (id: string, status: 'upvote' | 'downvote', user: any) => {
  const postExist = await PostModel.findById(id);
  if (!postExist) {
    throw new AppError(404, 'Post not found');
  }

  const userIdStr = String(user); // Ensure userId is a string for proper comparison

  // Check if the user has already upvoted or downvoted
  const hasUpvoted = postExist.upvotes.some((u: any) => String(u) === userIdStr);
  const hasDownvoted = postExist.downvotes.some((u: any) => String(u) === userIdStr);

  // Handle upvote
  if (status === 'upvote') {
    if (!hasUpvoted) {
      // If the user has downvoted before, remove them from downvotes
      if (hasDownvoted) {
        postExist.downvotes = postExist.downvotes.filter((u: any) => String(u) !== userIdStr);
      }
      // Add the user to upvotes
      postExist.upvotes.push(user);
    }
  }

  // Handle downvote
  if (status === 'downvote') {
    if (!hasDownvoted) {
      // If the user has upvoted before, remove them from upvotes
      if (hasUpvoted) {
        postExist.upvotes = postExist.upvotes.filter((u: any) => String(u) !== userIdStr);
      }
      // Add the user to downvotes
      postExist.downvotes.push(user);
    }
  }

  // Save the updated post
  const updatedPost = await postExist.save();

  return updatedPost;
};

//Get all posts created by a user
const getAllPostForUser = async (id: string, query: Record<string, unknown>) => {
  const result = new QueryBuilder(
    PostModel.find({ user: id })
      .sort('-createdAt')
      .populate('user') // Populate the user who created the post
      .populate({
        path: 'comments', // Populate comments
        populate: {
          path: 'user', // Populate the user inside each comment
          model: 'User', // Specify the model if needed
        },
      }),
    query
  )
    .paginate()
    .search(['title']);
  return await result.modelQuery;
};

export const postServices = {
  createPost,
  getAllPost,
  getSinglePost,
  deleteSinglePost,
  votePost,
  getAllPostForUser,
};

