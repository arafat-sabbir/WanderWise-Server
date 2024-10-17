import { z } from "zod";

const bookingValidationSchema = z.object({
  body:z.object({
    customer: z.string().optional(),
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: z.enum([
      "car",
      "truck",
      "SUV",
      "van",
      "motorcycle",
      "bus",
      "electricVehicle",
      "hybridVehicle",
      "bicycle",
      "tractor",
    ]),
    vehicleBrand: z.string().min(1),
    vehicleModel: z.string().min(1),
    manufacturingYear: z.number().min(4),
    registrationPlate: z.string().min(1),
  })
});

const bookingValidation = { bookingValidationSchema };
export default bookingValidation;
