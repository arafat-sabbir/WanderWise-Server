// Import the model
import PaymentModel from './payment.model'; 

// Service function to create a new payment.
const createPayment = async (data: object) => {
  const newPayment = await PaymentModel.create(data);
  return newPayment;
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
};