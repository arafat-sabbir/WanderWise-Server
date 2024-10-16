import { Request, Response } from 'express';
import { commentServices } from './comment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Comment.
const createComment = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new comment and get the result
  const result = await commentServices.createComment(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Comment created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single comment by ID.
 const getSingleComment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the comment by ID and get the result
  const result = await commentServices.getCommentById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Comment Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple comment.
 const getAllComment = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple comment based on query parameters and get the result
  const result = await commentServices.getAllComment(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Comments Retrieved Successfully',
    data: result,
  });
});


export const commentControllers = {
  createComment,
  getSingleComment,
  getAllComment,
}