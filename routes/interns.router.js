import { Router } from 'express';
import {
  getInterns,
  getInternById,
  createIntern,
  updateIntern,
  deleteIntern,
} from '../controllers/interns.controller.js';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createInternSchema,
  updateInternSchema,
  getInternSchema,
} from '../schemas/interns.schema.js';

const internsRouter = Router();

internsRouter.get('/', async (req, res, next) => {
  try {
    const interns = await getInterns();
    res.json({ data: interns });
  } catch (error) {
    next(error);
  }
});

internsRouter.get(
  '/:ID',
  validatorHandler(getInternSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.ID;
      const intern = await getInternById(id);
      res.json({ data: intern });
    } catch (error) {
      next(error);
    }
  }
);

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

internsRouter.patch(
  '/:ID',
  validatorHandler(updateInternSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.ID;
      const status = req.body.CURRENT_STATUS;
      const updatedIntern = await updateIntern(id, status);
      res.json({ data: updatedIntern });
    } catch (error) {
      next(error);
    }
  }
);

internsRouter.delete(
  '/:ID',
  validatorHandler(getInternSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.ID;
      const deletedIntern = await deleteIntern(id);
      res.json({ data: deletedIntern });
    } catch (error) {
      next(error);
    }
  }
);

export default internsRouter;
