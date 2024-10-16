import { Router } from 'express';
import userRoutes from '../modules/user/user.route';

const router = Router();

const routes = [
  {
    path: '/users',
    route: userRoutes,
  }
];

routes.forEach((route) => router.use(route.path, route.route));


const allRoutes = router;
export default allRoutes;
