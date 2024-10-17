import express from "express";
import { bookingController } from "./booking.controller";
import bookingValidation from "./booking.validation";
import validateRequest from "../../middlewares/validateRequest";
import AuthorizeRequest from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

// Create New Booking
router.post(
  "/bookings",
  AuthorizeRequest(USER_ROLE.user),
  validateRequest(bookingValidation.bookingValidationSchema),
  bookingController.create
);

//Get All Bookings
router.get(
  "/bookings",
  AuthorizeRequest(USER_ROLE.admin),
  bookingController.getAll
);

router.post('/confirmBookings',bookingController.bookingPage)

//Get My Bookings
router.get(
  "/my-bookings",
  AuthorizeRequest(USER_ROLE.user),
  bookingController.getSingle
);

export const bookingRoutes = router;
