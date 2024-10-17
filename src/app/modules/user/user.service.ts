/* eslint-disable @typescript-eslint/no-explicit-any */
// Import the model
import { Types } from 'mongoose';
import config from '../../config';
import AppError from '../../errors/AppError';
import generateToken from '../../utils/generateToken';
import { hashInfo } from '../../utils/hashInfo';
import { TUser } from './user.interface';
import UserModel from './user.model';
import bcrypt from 'bcrypt';

// Service function to create a new user.

const createUser = async (payload: TUser) => {
  if (!payload.profilePicture) {
    throw new AppError(400, 'Profile Picture Is Required');
  }
  const { password, ...data } = payload;
  const hashedPassword = await hashInfo(password);
  const newUser = await UserModel.create({ password: hashedPassword, ...data });
  return newUser;
};

// Service function to Login User And Return A Token

const loginUser = async (payload: { email: string; password: string }) => {
  const user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    throw new Error('User not found');
  }
  // if (!user.isVerified) {
  //   throw new Error('Please Verify Your Account');
  // }
  const isMatch = bcrypt.compareSync(payload.password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect Password Try Again');
  }

  const token = await generateToken(
    { id: user._id, role: user.role },
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...userData } = user.toObject();
  return { token, ...userData };
};

const getMe = async (id: string) => {
  // Find all users who follow the current user (followers array contains the user ID)
  const users = await UserModel.find({ followers: id }).exec();
  
  // Get the current user's details by ID
  const user = await UserModel.findById(id).populate("followers");
  
  // Convert the Mongoose user document to a plain object
  const userData = user?.toObject();

  // Ensure 'following' is correctly set as the number of users following the current user
  const data = {
    ...userData, // Spread user data first to ensure your custom 'following' key takes precedence
    following: users // Set following as the number of users following the current user
  };

  console.log(data); // Debug: check if following is correctly set as a number

  return data;
};


const updateMe = async (payload: any) => {
  return await UserModel.findByIdAndUpdate(payload.id, payload, { new: true });
};

// Follow Or Unfollow User
const followOrUnFollowUser = async (id: string, status: 'follow' | 'unfollow', user: any) => {
  const userExist = await UserModel.findById(id);
  if (!userExist) {
    throw new AppError(404, 'User not found');
  }

  const userIdStr = String(user); // Ensure userId is a string for proper comparison

  // Check if the user has already followed
  const hasFollowed = userExist.followers.some((u: any) => String(u) === userIdStr);

  // Handle follow
  if (status === 'follow') {
    if (!hasFollowed) {
      userExist.followers.push(user);
    }
  }

  // Handle unfollow
  if (status === 'unfollow') {
    if (hasFollowed) {
      // Remove the user from followers using pull
      userExist.followers = userExist.followers.filter(
        (follower: Types.ObjectId) => follower.toString() !== user
      );
    }
  }

  // Save the updated user
  const updatedUser = await userExist.save();

  return updatedUser;
};

export const userServices = {
  createUser,
  getMe,
  loginUser,
  updateMe,
  followOrUnFollowUser,
};

