import { Request, Response } from 'express';
import { followServices } from './follow.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Follow.
const createFollow = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new follow and get the result
  const result = await followServices.createFollow(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Follow created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single follow by ID.
 const getSingleFollow = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the follow by ID and get the result
  const result = await followServices.getFollowById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Follow Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple follow.
 const getAllFollow = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple follow based on query parameters and get the result
  const result = await followServices.getAllFollow(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Follows Retrieved Successfully',
    data: result,
  });
});


export const followControllers = {
  createFollow,
  getSingleFollow,
  getAllFollow,
}