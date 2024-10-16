import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

const validateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    // Parse the request body using the provided schema.
    await schema.parseAsync({ body: req.body, cookies: req.cookies });
    // Continue to the next middleware.
    next();
  });
};

export default validateRequest;
