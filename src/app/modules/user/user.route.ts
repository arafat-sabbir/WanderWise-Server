// Import Router from express
import { Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';

// Import controller from corresponding module

//Import validation from corresponding module

// Initialize router
const router = Router();

// Register A New User
router.post(
  '/create-user',
  validateRequest(userValidation.createUserSchema),
  userControllers.createUser
);

//Login User
router.post('/login', validateRequest(userValidation.loginUserSchema), userControllers.loginUser);

const userRoutes = router;
export default userRoutes;

