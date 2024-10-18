import { Request, Response } from 'express';
import { userServices } from './user.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single User.
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { photo } = req;
  // Call the service method to create a new user and get the result
  const result = await userServices.createUser({ profilePicture: photo, ...req.body });
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

// Get current User Detail By Token Id

const getMe = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  // Call the service method to create a new user and get the result
  const result = await userServices.getMe(id);
  // Send a success response with the created resource data
  sendResponse(res, {
    message: 'User Detail Retrieved Successfully',
    data: result,
  });
});

// Update current user Detail By Token Id

const updateMe = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { photo } = req;

  // Create an update object that conditionally includes the photo only if it exists
  const updateData: any = { id, ...req.body };

  if (photo) {
    updateData.profilePicture = photo;
  }

  // Call the service method to update the user profile
  const result = await userServices.updateMe(updateData);

  // Send a success response with the updated resource data
  sendResponse(res, {
    message: 'User Detail Updated Successfully',
    data: result,
  });
});

// Follow Or Unfollow User

const followOrUnFollowUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  // Call the service method to create a new user and get the result
  const result = await userServices.followOrUnFollowUser(id, status, req.user.id);
  // Send a success response with the created resource data
  sendResponse(res, {
    message: `${status.toUpperCase()}ED User Successfully'`,
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple user based on query parameters and get the result
  const result = await userServices.getAllUser();
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Users Retrieved Successfully',
    data: result,
  });
});

export const userControllers = {
  createUser,
  loginUser,
  getMe,
  updateMe,
  followOrUnFollowUser,
  getAllUser,
};

