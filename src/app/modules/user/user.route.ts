// Import Router from express
import { Router } from 'express';
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

router.put(
  '/me',
  upload.single('profilePicture'),
  uploadImage,
  AuthorizeRequest(),
  userControllers.updateMe
);

router.put(
  '/follow-unfollow/:id',
  AuthorizeRequest(),
  validateRequest(userValidation.followOrUnFollowUser),
  userControllers.followOrUnFollowUser
);

const userRoutes = router;
export default userRoutes;

