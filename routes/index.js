import { Router } from 'express';
import validateSession from '../middlewares/session.handler.js';
import calendarRouter from './calendar.router.js';
import internsRouter from './interns.router.js';
import positionsRouter from './positions.router.js';
import productsRouter from './products.router.js';
import schedulesRouter from './schedules.router.js';
import sessionsRouter from './sessions.router.js';
import uploadRouter from './upload.router.js';
import usersRouter from './users.router.js';

const apiRouter = Router();

apiRouter.use('/calendar', validateSession, calendarRouter);
apiRouter.use('/products', validateSession, productsRouter);
apiRouter.use('/schedules', validateSession, schedulesRouter);
apiRouter.use('/users', validateSession, usersRouter);

apiRouter.use('/interns', internsRouter);
apiRouter.use('/positions', positionsRouter);
apiRouter.use('/upload', uploadRouter);

export { sessionsRouter, apiRouter };
