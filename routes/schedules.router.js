import { Router } from 'express';
import { getSchedules } from '../controllers/schedules.controller.js';

const schedulesRouter = Router();

schedulesRouter.get('/', async (req, res, next) => {
  try {
    const schedules = await getSchedules();
    res.json({ data: schedules });
  } catch (error) {
    next(error);
  }
});

export default schedulesRouter;
