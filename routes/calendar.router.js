import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createCalendarSchema,
  getCalendarSchema,
} from '../schemas/calendar.schema.js';
import {
  createCalendar,
  deleteCalendar,
} from '../controllers/calendar.controller.js';

const calendarRouter = Router();

calendarRouter.post(
  '/',
  validatorHandler(createCalendarSchema, 'body'),
  async (req, res, next) => {
    try {
      const calendar = req.body;
      const createdCalendar = await createCalendar(calendar);
      res.status(201).json({ data: createdCalendar });
    } catch (error) {
      next(error);
    }
  }
);

calendarRouter.delete(
  '/:id',
  validatorHandler(getCalendarSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const deletedCalendar = await deleteCalendar(id);
      res.json({ data: deletedCalendar });
    } catch (error) {
      next(error);
    }
  }
);

export default calendarRouter;
