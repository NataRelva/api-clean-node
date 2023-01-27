import { FastifyInstance } from 'fastify';
import { AuthController } from '../controllers/AuthController';
import { authenticationMiddleware } from '../middlewares';

const authController = new AuthController();
const url = '/auth';

export const AuthRoutes = (router: FastifyInstance) => {
  router.post(url +'/signup', authController.create).addHook('preHandler', authenticationMiddleware.handle)
  router.post(url + '/login', authController.login);
  router.post(url +'/forgot-password',authController.forgotPassword);
}