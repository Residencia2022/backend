import { Router } from 'express';
import { getPositions } from '../controllers/positions.controller.js';

const positionsRouter = Router();

positionsRouter.get('/', async (req, res, next) => {
  try {
    const positions = await getPositions();
    res.json({ data: positions });
  } catch (error) {
    next(error);
  }
});

export default positionsRouter;
