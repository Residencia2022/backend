import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handler.js';
import { createInternSchema } from '../schemas/interns.schema.js';
import { createIntern } from '../controllers/interns.controller.js';

const internsRouter = Router();

internsRouter.post(
  '/',
  validatorHandler(createInternSchema, 'body'),
  async (req, res, next) => {
    try {
      const intern = req.body;
      const createdIntern = await createIntern(intern);
      res.status(201).json({ data: createdIntern });
    } catch (error) {
      next(error);
    }
  }
);

export default internsRouter;
