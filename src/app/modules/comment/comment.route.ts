// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { commentControllers } from './comment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { commentValidation } from './comment.validation';


// Initialize router
const router = Router();

router.post("/create-comment",validateRequest(commentValidation.createCommentSchema), commentControllers.createComment);

const commentRoutes = router;
export default commentRoutes;