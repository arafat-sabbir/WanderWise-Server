/* eslint-disable @typescript-eslint/no-explicit-any */
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { commentServices } from './comment.service';

const createNewComment = catchAsync(async (req, res) => {
  const { id:postId } = req.params;
  const { id } = req.user;
  const result = await commentServices.createNewComment({
    user: id as any,
    post: postId as any,
    comment: req.body.comment,
  });
  sendResponse(res, {
    message: 'Comment created successfully',
    data: result,
  });
});

const editComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentServices.editComment({
    id,
    comment: req.body.comment,
    user: req.user.id,
  });
  sendResponse(res, {
    message: 'Comment updated successfully',
    data: result,
  });
});

const deletedComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentServices.deleteComment({ id, user: req.user.id });
  sendResponse(res, {
    message: 'Comment deleted successfully',
    data: result,
  });
});

const getAllCommentForAPost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentServices.getAllCommentForAPostFromDb(id);
  sendResponse(res, {
    message: 'Comment fetched For Specific Post successfully',
    data: result,
  });
});

const getSingleComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await commentServices.getSingleCommentFromDb(id);
  sendResponse(res, {
    message: 'Comment fetched successfully',
    data: result,
  });
});

export const CommentControllers = {
  createNewComment,
  editComment,
  deletedComment,
  getAllCommentForAPost,
  getSingleComment,
};

