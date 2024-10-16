import mongoose from 'mongoose';
import { TErrorSources } from '../interface/error';

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  console.log('from Validation error', err);
  const statusCode = 400;
  const errorSources: TErrorSources =
    (err.errors &&
      Object.values(err.errors).map(
        (val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
          path: val.path,
          message: val.message,
        })
      )) ||
    [];
  return { statusCode, message: 'Validation Error', errorSources };
};

export default handleValidationError;
