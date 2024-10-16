import { Response } from 'express';

interface TResponse<T> {
  message: string;
  data: T;
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  res.status(200).json({
    success: true,
    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
