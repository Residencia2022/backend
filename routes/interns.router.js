import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handler.js';
import { createInternSchema, deleteInternSchema, getInternSchema } from '../schemas/interns.schema.js';
import { createIntern, deleteIntern, getIntern } from '../controllers/interns.controller.js';


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

internsRouter.delete(
  '/:ID_INTERN',
  validatorHandler(deleteInternSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.ID_INTERN;
      const deletedIntern = await deleteIntern(id);
      res.json({ data: deletedIntern });
    } catch (error) {
      next(error);
    }
  }
);

internsRouter.get(
  '/:ID_INTERN',
  validatorHandler(getInternSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.ID_INTERN;
      const getedIntern = await getIntern(id);
      res.json({ data: getedIntern });
    } catch (error) {
      next(error);
    }
  }
);

export default internsRouter;
