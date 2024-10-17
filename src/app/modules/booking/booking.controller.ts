import catchAsync from "../../utils/catchAsync";
import bookingService from "./booking.service";
import sendResponse from "../../utils/sendResponse";
import BookingModel from "./booking.model";

const create = catchAsync(async (req, res) => {
  const { serviceId, slotId, ...others } = req.body;
  const data = {
    customer: req.user._id,
    service: req.body.serviceId,
    slot: req.body.slotId,
    ...others,
  };
  const result = await bookingService.create(data);
  sendResponse(res, {
    message: "Booking successful",
    data: result,
  });
});

const getAll = catchAsync(async (req, res) => {
  const result = await bookingService.getAll();
  sendResponse(res, {
    message: "All bookings retrieved successfully",
    data: result,
  });
});
const getSingle = catchAsync(async (req, res) => {
  const result = await bookingService.getSingle(req.user._id);
  sendResponse(res, {
    message: "User bookings retrieved successfully",
    data: result,
  });
});


const bookingPage = catchAsync(async (req, res) => {
  // Read the status from the query parameters
  const { status, transactionId } = req.query;

  // Define the title, message, and color based on the status
  let title;
  let message;
  let color;

  if (status === 'success') {
    await bookingService.updatePaymentStatus(transactionId as string);
    title = 'Payment Successful!';
    message = 'Thank you for booking your car wash service. Your payment has been successfully processed.';
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
          <a href="http://localhost:5173"
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



export const bookingController = { create, getAll, getSingle, bookingPage };
