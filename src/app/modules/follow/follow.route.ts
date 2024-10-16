// Import Router from express
// Import Router from express
import { Router } from 'express';

// Import controller from corresponding module
import { followControllers } from './follow.controller';
import validateRequest from '../../middlewares/validateRequest';
import { followValidation } from './follow.validation';


// Initialize router
const router = Router();

router.post("/create-follow",validateRequest(followValidation.createFollowSchema), followControllers.createFollow);

const followRoutes = router;
export default followRoutes;