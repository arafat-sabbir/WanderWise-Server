// Import the model
import CommentModel from './comment.model'; 

// Service function to create a new comment.
const createComment = async (data: object) => {
  const newComment = await CommentModel.create(data);
  return newComment;
};


// Service function to retrieve a single comment by ID.
const getCommentById = async (id: string) => {
  return await CommentModel.findById(id);
};

// Service function to retrieve multiple comment based on query parameters.
const getAllComment = async (query: object) => {
  return await CommentModel.find(query);
};

export const commentServices = {
  createComment,
  getCommentById,
  getAllComment,
};