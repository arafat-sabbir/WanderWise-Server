import { Request, Response } from 'express';
import { postServices } from './post.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Post.
const createPost = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  // Call the service method to create a new post and get the result
  const result = await postServices.createPost({ user: id, ...req.body });
  // Send a success response with the created resource data
  sendResponse(res, {
    message: 'New Post created Successfully',
    data: result,
  });
});

// Controller function to handle the retrieval of multiple post.
const getAllPost = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple post based on query parameters and get the result
  const result = await postServices.getAllPost(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Posts Retrieved Successfully',
    data: result,
  });
});

//Get single Post By Post _Id
const getSinglePost = catchAsync(async (req: Request, res: Response) => {
  const result = await postServices.getSinglePost(req.params.postId);
  sendResponse(res, {
    message: 'Post Retrieved Successfully',
    data: result,
  });
});

// Delete Single Post By PostId
const deleteSinglePost = catchAsync(async (req: Request, res: Response) => {
  const result = await postServices.deleteSinglePost(req.params.postId);
  sendResponse(res, {
    message: 'Post Deleted Successfully',
    data: result,
  });
});

export const postControllers = {
  createPost,
  getSinglePost,
  getAllPost,
  deleteSinglePost,
};

