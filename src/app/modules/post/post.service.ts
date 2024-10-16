// Import the model
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import PostModel from './post.model';

// Service function to create a new post.
const createPost = async (data: object) => {
  const newPost = await PostModel.create(data);
  return newPost;
};

// Service function to retrieve a single post by ID.
const getSinglePost = async (id: string) => {
  return await PostModel.findById(id);
};

// Service function to retrieve multiple post based on query parameters.
const getAllPost = async (query: Record<string, unknown>) => {
  const result = new QueryBuilder(PostModel.find(), query).paginate();
  return await result.modelQuery;
};

// Delete A Post By PostId
const deleteSinglePost = async (id: string) => {
  const result = await PostModel.findByIdAndDelete(id);
  if (!result) {
    throw new AppError(404, 'Post Not Found');
  }
  return result;
};

export const postServices = {
  createPost,
  getAllPost,
  getSinglePost,
  deleteSinglePost,
};

