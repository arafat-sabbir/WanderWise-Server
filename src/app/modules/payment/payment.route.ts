// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { paymentControllers } from './payment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { paymentValidation } from './payment.validation';
import AuthorizeRequest from '../../middlewares/auth';

// Initialize router
const router = Router();

router.post(
  '/create-payment',
  AuthorizeRequest(),
  validateRequest(paymentValidation.createPaymentSchema),
  paymentControllers.createPayment
);
router.post('/confirm-payment', paymentControllers.confirmPayment);
router.get('/all', AuthorizeRequest('admin'), paymentControllers.getAllPayment);
const paymentRoutes = router;
export default paymentRoutes;
