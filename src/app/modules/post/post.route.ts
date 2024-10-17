// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { postControllers } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { postValidation } from './post.validation';
import { upload, uploadImages } from '../../utils/uploadImage';
import AuthorizeRequest from '../../middlewares/auth';

// Initialize router
const router = Router();

router.post(
  '/',
  AuthorizeRequest(),
  upload.fields([{ name: 'images', maxCount: 3 }]),
  uploadImages, // Change to uploadImages to handle multiple files
  validateRequest(postValidation.createPostSchema),
  postControllers.createPost
);

// Get All The Post With Sort Filter Or Pagination
router.get('/', postControllers.getAllPost);

// Get Single Post By Post _Id
router.get('/:postId', postControllers.getSinglePost);

// Delete Single Post By Post _Id
router.delete('/:postId', postControllers.deleteSinglePost);

// Upvote Or DownVote On A Post By Post _Id
router.patch(
  '/vote/:id',
  AuthorizeRequest('user'),
  validateRequest(postValidation.votePostValidation),
  postControllers.votePost
);

// Get All The Post With Sort Filter Or Pagination
router.get('/get-post/me', AuthorizeRequest(), postControllers.getAllPostForUser);

const postRoutes = router;
export default postRoutes;

