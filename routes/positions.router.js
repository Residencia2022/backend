import { Router } from 'express';
import { getPositions } from '../controllers/positions.controller.js';

const positionsRouter = Router();

positionsRouter.get('/', async (req, res) => {
  try {
    const positions = await getPositions();
    res.json({ data: positions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default positionsRouter;
