//An Custom Error Handler For Handleing The Mongoose Duplicate Error

import { TErrorSources } from '../interface/error';

const handleDuplicateError = (err: any) => {
  const statusCode = 400;
  const match = err.message.match(/"([^"]*)"/);
  const extractedMessage = match && match[1];
  const errorSources: TErrorSources = [
    {
      path: err.keyValue,
      message: `${extractedMessage} already exists`,
    },
  ];
  return { statusCode, message: `${extractedMessage} already exists`, errorSources };
};

export default handleDuplicateError;
