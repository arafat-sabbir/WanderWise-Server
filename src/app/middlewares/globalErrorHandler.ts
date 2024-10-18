/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Response } from 'express';
import { ZodError } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import config from '../config';
import handleValidationError from '../errors/HandleValidationError';
import handleZodError from '../errors/HandleZodError';
import handleCastError from '../errors/HandleCastError';
import handleDuplicateError from '../errors/HandleDuplicateError';
import AppError from '../errors/AppError';

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req,
  res: Response<TGenericErrorResponse>,
  next: NextFunction
) => {
  let statusCode = 500;
  let stack = null;
  let message = 'Something Went Wrong';
  let errorSources: TErrorSources = [
    {
      path: ' ',
      message: 'Something Went Wrong',
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    stack = config.node_env === 'development' && error.stack;
  } else if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    stack = config.node_env === 'development' && error.stack;
  } else if (error.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    stack = config.node_env === 'development' && error.stack;
  } else if (error.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
    stack = config.node_env === 'development' && error.stack;
  } else if (error instanceof AppError) {
    statusCode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: ' ',
        message: error.message,
      },
    ];
    stack = config.node_env === 'development' && error.stack;
  } else if (error instanceof Error) {
    message = error?.message;
    errorSources = [
      {
        path: ' ',
        message: error.message,
      },
    ];
    stack = config.node_env === 'development' && error.stack;
  }

  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorSources,
    ...(stack && { stack }),
  });

  // Ensure the function returns void
  return;
};

export default globalErrorHandler;