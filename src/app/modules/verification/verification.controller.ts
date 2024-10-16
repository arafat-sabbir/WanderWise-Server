import { Request, Response } from 'express';
import { verificationServices } from './verification.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

// Controller function to handle the creation of a single Verification.
const createVerification = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to create a new verification and get the result
  const result = await verificationServices.createVerification(req.body);
  // Send a success response with the created resource data
    sendResponse(res, {
    message: 'New Verification created Successfully',
    data: result,
  });
});



// Controller function to handle the retrieval of a single verification by ID.
 const getSingleVerification = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  // Call the service method to get the verification by ID and get the result
  const result = await verificationServices.getVerificationById(id);
  // Send a success response with the retrieved resource data
   sendResponse(res, {
    message: 'Verification Retrieved Successfully',
    data: result,
  });
});


// Controller function to handle the retrieval of multiple verification.
 const getAllVerification = catchAsync(async (req: Request, res: Response) => {
  // Call the service method to get multiple verification based on query parameters and get the result
  const result = await verificationServices.getAllVerification(req.query);
  // Send a success response with the retrieved resources data
  sendResponse(res, {
    message: 'Verifications Retrieved Successfully',
    data: result,
  });
});


export const verificationControllers = {
  createVerification,
  getSingleVerification,
  getAllVerification,
}