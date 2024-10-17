import { Types } from "mongoose";

export type TBooking = {
  customer?: Types.ObjectId;
  service: Types.ObjectId;
  slot: Types.ObjectId;
  vehicleType:
    | "car"
    | "truck"
    | "SUV"
    | "van"
    | "motorcycle"
    | "bus"
    | "electricVehicle"
    | "hybridVehicle"
    | "bicycle"
    | "tractor";
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
  registrationPlate: string;
  price: number;
  isPaid: boolean;
  transactionId: string;
};
