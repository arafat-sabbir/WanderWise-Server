import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
import postRoutes from '../modules/post/post.route';
import commentRoutes from '../modules/comment/comment.route';

const router = Router();

const routes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
  {
    path:"/comments",
    route:commentRoutes
  }
];

routes.forEach((route) => router.use(route.path, route.route));

const allRoutes = router;
export default allRoutes;

