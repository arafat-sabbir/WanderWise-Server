import { Request, Response } from 'express';
import { paymentServices } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Payment.
const createPayment = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new payment and get the result
  const result = await paymentServices.createPayment(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Payment created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single payment by ID.
 const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the payment by ID and get the result
  const result = await paymentServices.getPaymentById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Payment Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple payment.
 const getAllPayment = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple payment based on query parameters and get the result
  const result = await paymentServices.getAllPayment(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Payments Retrieved Successfully',
    data: result,
  });
});


export const paymentControllers = {
  createPayment,
  getSinglePayment,
  getAllPayment,
}