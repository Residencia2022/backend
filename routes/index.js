import { Router } from 'express';
import usersRouter from './users.router.js';

const loginRouter = Router();

const apiRouter = Router();
apiRouter.use('/users', usersRouter);

export { loginRouter, apiRouter };
