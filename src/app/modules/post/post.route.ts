// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { postControllers } from './post.controller';
import validateRequest from '../../middlewares/validateRequest';
import { postValidation } from './post.validation';


// Initialize router
const router = Router();

router.post("/create-post",validateRequest(postValidation.createPostSchema), postControllers.createPost);

const postRoutes = router;
export default postRoutes;