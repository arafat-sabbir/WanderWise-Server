import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import UserModel from '../modules/user/user.model';

/**
 * Middleware to authorize requests.
 * Checks if the request has a valid authorization token.
 * If not, it throws an unauthorized error.
 */

const AuthorizeRequest = (...roles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Get the authorization token from the request headers
    const token = req.headers.authorization?.split(' ')[1];
    // If no token is provided, throw an unauthorized error
    if (!token) {
      throw new AppError(401, 'Unauthorized Access1');
    }
    try {
      const decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
      req.user = decoded;
      const { id, role } = decoded;
      console.log(roles,role);
      if (roles.length > 0 && !roles.includes(role)) {
        throw new AppError(401, 'Unauthorized Access2');
      }
    
      const user = await UserModel.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
    } catch (error: any) {
      console.error('JWT Error:', error.message);
      throw new AppError(401, `Unauthorized Access3: ${error.message}`);
    }
    
    next();
  });
};

export default AuthorizeRequest;

