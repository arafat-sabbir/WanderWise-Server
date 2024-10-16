import { Request, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single User.
const createUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new user and get the result
  const result = await userServices.createUser(req.body);
  // Send a success response with the created resource data
  sendResponse(res, {
    message: 'New user Added Successfully',
    data: result,
  });
});


// Controller function to handle Login
const loginUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new user and get the result
  const result = await userServices.loginUser(req.body);
  // Send a success response with the created resource data
  sendResponse(res, {
    message: 'Log In Successful',
    data: result,
  });
});



export const userControllers = {
  createUser,
  loginUser
};
