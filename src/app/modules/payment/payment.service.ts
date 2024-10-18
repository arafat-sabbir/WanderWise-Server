// Import the model
import PaymentModel from './payment.model';
import AppError from '../../errors/AppError';
import axios from 'axios';
import config from '../../config';
import UserModel from '../user/user.model';

// Service function to create a new payment.
const createPayment = async (payload: any) => {
  const user = await UserModel.findById(payload.user);
  if (!user) {
    throw new AppError(404, 'User not found');
  }
  const paymentExist = await PaymentModel.findOne({
    user: user?._id,
  });

  if (paymentExist) {
    throw new AppError(400, 'You have already made a payment Please Contact Admin');
  }
  try {
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const transactionId = `${timestamp}${randomNum}`;
    const response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      tran_id: `${transactionId}`,
      success_url: `${config.backend_url}/api/v1/payments/confirm-payment?status=success&transactionId=${transactionId}&user=${user?._id}`,
      fail_url: `${config.backend_url}/api/v1/payments/confirm-payment?status=error&transactionId=${transactionId}`,
      cancel_url: `${config.frontend_url}/payment?status=canceled&transactionId=${transactionId}`,
      amount: 500,
      currency: 'BDT',
      signature_key: config.signature_key,
      desc: 'Merchant Registration Payment',
      cus_name: user!.name || '',
      cus_email: user!.email || '',
      cus_add1: payload.address || '',
      cus_add2: 'Mohakhali DOHS',
      cus_city: 'Dhaka',
      cus_state: 'Dhaka',
      cus_postcode: '1206',
      cus_country: 'Bangladesh',
      cus_phone: '01632024256',
      type: 'json',
    });
    payload.transactionId = `${timestamp}${randomNum}`;
    return { payment_url: response?.data.payment_url };
  } catch (error: any) {
    throw new AppError(400, error.message as string);
  }
};

const updatePaymentStatus = async (id: string) => {
  const result = await PaymentModel.findOneAndUpdate(
    { transactionId: id },
    { status: 'paid' },
    { new: true }
  );
  return result;
};
// Service function to retrieve a single payment by ID.
const getPaymentById = async (id: string) => {
  return await PaymentModel.findById(id);
};

// Service function to retrieve multiple payment based on query parameters.
const getAllPayment = async (query: object) => {
  return await PaymentModel.find(query);
};

export const paymentServices = {
  createPayment,
  getPaymentById,
  getAllPayment,
  updatePaymentStatus,
};

