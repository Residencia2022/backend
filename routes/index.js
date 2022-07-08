import { Router } from 'express';
import positionsRouter from './positions.router.js';
import productsRouter from './products.router.js';
import schedulesRouter from './schedules.router.js';
import usersRouter from './users.router.js';

const loginRouter = Router();

const apiRouter = Router();
apiRouter.use('/positions', positionsRouter);
apiRouter.use('/products', productsRouter);
apiRouter.use('/schedules', schedulesRouter);
apiRouter.use('/users', usersRouter);

export { loginRouter, apiRouter };
