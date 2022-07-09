import { Router } from 'express';
import Boom from '@hapi/boom';
import login from '../controllers/sessions.controller.js';

const sessionsRouter = Router();

sessionsRouter.post('/', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      next(Boom.badRequest('Missing email or password'));
      return;
    }
    const user = await login(email, password);
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
});

export default sessionsRouter;
