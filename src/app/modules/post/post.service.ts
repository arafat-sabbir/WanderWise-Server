// Import the model
import PostModel from './post.model'; 

// Service function to create a new post.
const createPost = async (data: object) => {
  const newPost = await PostModel.create(data);
  return newPost;
};


// Service function to retrieve a single post by ID.
const getPostById = async (id: string) => {
  return await PostModel.findById(id);
};

// Service function to retrieve multiple post based on query parameters.
const getAllPost = async (query: object) => {
  return await PostModel.find(query);
};

export const postServices = {
  createPost,
  getPostById,
  getAllPost,
};