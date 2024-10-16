// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { postControllers } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { postValidation } from './post.validation';
import { upload, uploadImage } from '../../utils/uploadImage';
import AuthorizeRequest from '../../middlewares/auth';

// Initialize router
const router = Router();

router.post(
  '/',
  AuthorizeRequest(),
  upload.fields([{ name: 'images', maxCount: 6 }]),
  uploadImage,
  validateRequest(postValidation.createPostSchema),
  postControllers.createPost
);

const postRoutes = router;
export default postRoutes;

