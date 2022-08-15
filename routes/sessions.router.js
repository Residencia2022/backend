import { Router } from 'express';
import {
  getUserByEmail,
  getUserByToken,
} from '../controllers/sessions.controller.js';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  getUserByEmailSchema,
  getUserByTokenSchema,
} from '../schemas/users.schema.js';

const sessionsRouter = Router();

sessionsRouter.get(
  '/:TOKEN',
  validatorHandler(getUserByTokenSchema, 'params'),
  async (req, res, next) => {
    try {
      const token = req.params.TOKEN;
      const user = await getUserByToken(token);
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }
);

sessionsRouter.post(
  '/',
  validatorHandler(getUserByEmailSchema, 'body'),
  async (req, res, next) => {
    try {
      const email = req.body.EMAIL;
      const password = req.body.PASSWORD;
      const user = await getUserByEmail(email, password);
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }
);

export default sessionsRouter;
