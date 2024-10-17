import axios from "axios";
import AppError from "../../errors/AppError";
import SlotModel from "../slot/slot.model";
import BookingModel from "./booking.model";

import mongoose from "mongoose";
import config from "../../config";

const create = async (payload: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  let response;
  try {
    const slot = await SlotModel.findByIdAndUpdate(payload.slot);
    if (slot?.isBooked === "booked") {
      throw new AppError(400, "Slot Already Booked");
    }
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const transactionId = `${timestamp}${randomNum}`;
    response = await axios.post(config.payment_url!, {
      store_id: config.store_id,
      tran_id: `${transactionId}`,
      success_url: `${config.backend_url}/api/confirmBookings?status=success&transactionId=${transactionId}`,
      fail_url: `${config.backend_url}/api/confirmBookings?status=error&transactionId=${transactionId}`,
      cancel_url: `${config.frontend_url}/booking?status=canceled&transactionId=${transactionId}`,
      amount: payload.price,
      currency: "BDT",
      signature_key: config.signature_key,
      desc: "Merchant Registration Payment",
      cus_name: payload.name,
      cus_email: payload.email,
      cus_add1: payload.address,
      cus_add2: "Mohakhali DOHS",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1206",
      cus_country: "Bangladesh",
      cus_phone: payload.phone,
      type: "json",
    });
    payload.transactionId = `${timestamp}${randomNum}`;
    const result = await BookingModel.create([payload], { session });
    const updatedSlot = await SlotModel.findByIdAndUpdate(
      payload.slot,
      { isBooked: "booked" },
      { session, new: true }
    );
    if (!updatedSlot) throw new AppError(404, "No Data Found", []);
    await session.commitTransaction();
    session.endSession();
    return { payment_url: response?.data.payment_url };
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(400, error.message as string);
  }
};

//Get All The Bookings
const getAll = async () => {
  const result = await BookingModel.find({}).populate("service customer slot");
  if (!result || !result.length) throw new AppError(404, "No Data Found", []);
  return result;
};

//Get Single Bookings
const getSingle = async (id: string) => {
  const result = await BookingModel.find({ customer: id }).populate(
    "service customer slot"
  );
  if (!result || !result.length) throw new AppError(404, "No Data Found", []);
  return result;
};

const updatePaymentStatus = async (id: string) => {
  const result = await BookingModel.findOneAndUpdate(
    { transactionId: id },
    { isPaid: true },
    { new: true }
  );
  return result;
};

const bookingService = { create, getAll, getSingle, updatePaymentStatus };
export default bookingService;
