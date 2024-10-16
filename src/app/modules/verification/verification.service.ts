// Import the model
import VerificationModel from './verification.model'; 

// Service function to create a new verification.
const createVerification = async (data: object) => {
  const newVerification = await VerificationModel.create(data);
  return newVerification;
};


// Service function to retrieve a single verification by ID.
const getVerificationById = async (id: string) => {
  return await VerificationModel.findById(id);
};

// Service function to retrieve multiple verification based on query parameters.
const getAllVerification = async (query: object) => {
  return await VerificationModel.find(query);
};

export const verificationServices = {
  createVerification,
  getVerificationById,
  getAllVerification,
};