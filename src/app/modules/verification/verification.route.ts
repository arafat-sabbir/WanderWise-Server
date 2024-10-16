// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { verificationControllers } from './verification.controller';
import validateRequest from '../../middlewares/validateRequest';
import { verificationValidation } from './verification.validation';


// Initialize router
const router = Router();

router.post("/create-verification",validateRequest(verificationValidation.createVerificationSchema), verificationControllers.createVerification);

const verificationRoutes = router;
export default verificationRoutes;