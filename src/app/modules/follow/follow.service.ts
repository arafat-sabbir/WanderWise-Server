// Import the model
import FollowModel from './follow.model'; 

// Service function to create a new follow.
const createFollow = async (data: object) => {
  const newFollow = await FollowModel.create(data);
  return newFollow;
};


// Service function to retrieve a single follow by ID.
const getFollowById = async (id: string) => {
  return await FollowModel.findById(id);
};

// Service function to retrieve multiple follow based on query parameters.
const getAllFollow = async (query: object) => {
  return await FollowModel.find(query);
};

export const followServices = {
  createFollow,
  getFollowById,
  getAllFollow,
};