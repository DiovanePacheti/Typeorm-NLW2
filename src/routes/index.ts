import Router from 'express'
import userRoutes from './user.routes';

const routes = Router()

routes.use('/classes', userRoutes);

export default routes;