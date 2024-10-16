import { Types } from 'mongoose';
import AppError from '../../errors/AppError';
import PostModel from '../post/post.model';
import UserModel from '../user/user.model';
import { TComment } from './comment.interface';
import Comment from './comment.model';

const createNewComment = async (payload: TComment) => {
  const user = await UserModel.findById(payload.user);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const post = await PostModel.findById(payload.post);
  if (!post) {
    throw new AppError(404, 'Post not found');
  }
  const comment = await Comment.create(payload);
  post.comments.push(comment._id);
  await post.save();
  return comment;
};

const editComment = async (payload: { id: string; comment: string; user: string }) => {
  const comment = await Comment.findById(payload.id);
  if (!comment) {
    throw new AppError(404, 'Comment not found');
  }
  if (comment.user.toString() !== payload.user) {
    throw new AppError(403, 'You are not authorized to edit this comment');
  }
  const updatedComment = await Comment.findByIdAndUpdate(
    payload.id,
    { comment: payload.comment },
    {
      new: true,
    }
  );
  return updatedComment;
};

const deleteComment = async (payload: { id: string; user: string }) => {
  // Find the comment by ID
  const comment = await Comment.findById(payload.id);
  if (!comment) {
    throw new AppError(404, 'Comment not found');
  }

  // Check if the user is authorized to delete the comment
  if (comment.user.toString() !== payload.user) {
    throw new AppError(401, 'You are not authorized to delete this comment');
  }

  // Delete the comment
  const deleteComment = await Comment.findByIdAndDelete(payload.id);

  // Find the associated post and ensure it exists
  const post = await PostModel.findById(comment.post);
  if (!post) {
    throw new AppError(404, 'Associated post not found');
  }

  // Remove the comment ID from the post's comments array using filter
  post.comments = post.comments.filter(
    (commentId: Types.ObjectId) => commentId.toString() !== payload.id
  );

  await post.save(); // Save the updated post

  return deleteComment;
};

const getAllCommentForAPostFromDb = async (id: string) => {
  const comments = await Comment.find({ post: id }).populate('user');
  return comments;
};

const getSingleCommentFromDb = async (id: string) => {
  const comment = await Comment.findById(id).populate('user');
  return comment;
};

export const commentServices = {
  createNewComment,
  editComment,
  deleteComment,
  getAllCommentForAPostFromDb,
  getSingleCommentFromDb,
};

