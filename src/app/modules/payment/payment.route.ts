// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { paymentControllers } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { paymentValidation } from './payment.validation';


// Initialize router
const router = Router();

router.post("/create-payment",validateRequest(paymentValidation.createPaymentSchema), paymentControllers.createPayment);

const paymentRoutes = router;
export default paymentRoutes;