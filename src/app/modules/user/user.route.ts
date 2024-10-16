// Import Router from express
import { NextFunction, Request, Response, Router } from 'express';
import { userControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from './user.validation';
import { upload, uploadImage } from '../../utils/uploadImage';
import AuthorizeRequest from '../../middlewares/auth';

// Import controller from corresponding module

//Import validation from corresponding module

// Initialize router
const router = Router();

// Register A New User
router.post(
  '/register',
  upload.single('profilePicture'),
  uploadImage,
  validateRequest(userValidation.createUserSchema),
  userControllers.createUser
);

//Login User
router.post('/login', validateRequest(userValidation.loginUserSchema), userControllers.loginUser);

// Get current User Detail By Token Id
router.get('/me', AuthorizeRequest(), userControllers.getMe);

const userRoutes = router;
export default userRoutes;

