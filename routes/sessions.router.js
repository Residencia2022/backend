import { Router } from 'express';
import login from '../controllers/sessions.controller.js';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await login(email, password);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

export default sessionsRouter;
