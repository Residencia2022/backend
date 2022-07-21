import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createCalendarSchema,
  getCalendarSchema,
} from '../schemas/calendar.schema.js';
import {
  createCalendar,
  getCalendar,
  getCalendarByMonth,
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

calendarRouter.get('/', async (req, res, next) => {
  try {
    const calendar = await getCalendar();
    res.json({ data: calendar });
  } catch (error) {
    next(error);
  }
});

calendarRouter.get('/:year/:month', async (req, res, next) => {
  try {
    const year = req.params.year;
    const month = req.params.month;
    const calendar = await getCalendarByMonth(year, month);
    res.json({ data: calendar });
  } catch (error) {
    next(error);
  }
});

calendarRouter.delete(
  '/:ID',
  validatorHandler(getCalendarSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.ID;
      const deletedCalendar = await deleteCalendar(id);
      res.json({ data: deletedCalendar });
    } catch (error) {
      next(error);
    }
  }
);

export default calendarRouter;
