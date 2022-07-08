import { Router } from 'express';
import { getSchedules } from '../controllers/schedules.controller.js';

const schedulesRouter = Router();

schedulesRouter.get('/', async (req, res) => {
  try {
    const schedules = await getSchedules();
    res.json({ data: schedules });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default schedulesRouter;
