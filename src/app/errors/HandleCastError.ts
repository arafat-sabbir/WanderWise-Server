import mongoose from 'mongoose';
import { TGenericErrorResponse } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
  const errorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];
  return {
    statusCode: 400,
    success: false,
    message: 'Invalid Id Provided',
    errorSources,
  };
};

export default handleCastError;
