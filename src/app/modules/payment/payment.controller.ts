import { Request, Response } from 'express';
import { paymentServices } from './payment.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import PaymentModel from './payment.model';
import UserModel from '../user/user.model';

// Controller function to handle the creation of a single Payment.
const createPayment = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const { amount, name, email } = req.body;
  // Call the service method to create a new payment and get the result
  const result = await paymentServices.createPayment({ amount, name, email, user: id });
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

const confirmPayment = catchAsync(async (req, res) => {
  // Read the status from the query parameters
  const { status, transactionId, user } = req.query;

  // Define the title, message, and color based on the status
  let title;
  let message;
  let color;

  if (status === 'success') {
    await PaymentModel.create({ user, status: 'paid' });
    await UserModel.findByIdAndUpdate(user, { isVerified: true });
    title = 'Payment Successful!';
    message = 'Thank you for Verifying You Account. Your payment has been successfully processed.';
    color = '#38a169'; // Green
  } else {
    title = 'Payment Failed!';
    message = 'There was an issue with your payment. Please try again or contact support.';
    color = '#e53e3e'; // Red
  }

  res.send(`
    <div style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f7fafc;
    ">
      <div style="
        width: 100%;
        max-width: 640px;
        padding: 32px;
        background-color: white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 12px;
        text-align: center;
        margin: 0 auto;
      ">
        <h1 style="
          font-size: 36px;
          font-weight: bold;
          color: ${color};
          margin-bottom: 24px;
        ">
          ${title}
        </h1>
        <p style="
          color: #4a5568;
          margin-bottom: 16px;
        ">
          ${message}
        </p>
        <div style="
          font-size: 18px;
          color: #2d3748;
          font-weight: 500;
        ">
          <p style="margin-bottom: 12px;">
            <strong>Transaction ID:</strong> ${transactionId}
          </p>
          <p>We'll contact you soon with further details.</p>
        </div>
        <div style="margin-top: 24px;">
          <a href="http://localhost:3000"
            style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #41b4a3;
              color: white;
              font-weight: 600;
              border-radius: 8px;
              text-decoration: none;
              transition: background-color 0.2s ease-in-out;
            "
            onmouseover="this.style.backgroundColor='#329f8b';"
            onmouseout="this.style.backgroundColor='#41b4a3';">
            Back to Home
          </a>
        </div>
      </div>
    </div>
  `);
});
export const paymentControllers = {
  createPayment,
  getSinglePayment,
  getAllPayment,
  confirmPayment,
};

