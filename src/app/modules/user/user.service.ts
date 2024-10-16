// Import the model
import config from '../../config';
import generateToken from '../../utils/generateToken';
import { hashInfo } from '../../utils/hashInfo';
import { TUser } from './user.interface';
import UserModel from './user.model';
import bcrypt from 'bcrypt';

// Service function to create a new user.

const createUser = async (payload: TUser) => {
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
  if (!user.isVerified) {
    throw new Error('Please Verify Your Account');
  }
  const isMatch = bcrypt.compareSync(payload.password, user.password);
  if (!isMatch) {
    throw new Error('Incorrect Password Try Again');
  }

  const token = await generateToken(
    { id: user._id, role: user.role },
    config.jwt_access_secret as string,
    config.jwt_access_expires as string
  );
  return { token };
};

// Service function to retrieve a single user by ID.

const getUserById = async (id: string) => {
  return await UserModel.findById(id);
};

// Service function to retrieve multiple user based on query parameters.

export const userServices = {
  createUser,
  getUserById,
  loginUser,
};

