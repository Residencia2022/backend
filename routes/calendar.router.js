import { Router } from 'express';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createCalendarSchema,
  getCalendarByDatesSchema,
  getCalendarByLineSchema,
  deleteCalendarSchema,
} from '../schemas/calendar.schema.js';
import {
  createCalendar,
  getCalendar,
  getCalendarByDates,
  getCalendarByLine,
  deleteCalendar,
} from '../controllers/calendar.controller.js';

const calendarRouter = Router();

calendarRouter.get('/', async (req, res, next) => {
  try {
    const calendar = await getCalendar();
    res.json({ data: calendar });
  } catch (error) {
    next(error);
  }
});

calendarRouter.get(
  '/:LINE',
  validatorHandler(getCalendarByLineSchema, 'params'),
  async (req, res, next) => {
    try {
      const line = req.params.LINE;
      const calendar = await getCalendarByLine(line);
      res.json({ data: calendar });
    } catch (error) {
      next(error);
    }
  }
);

calendarRouter.get(
  '/:START/:END',
  validatorHandler(getCalendarByDatesSchema, 'params'),
  async (req, res, next) => {
    try {
      const start = req.params.START;
      const end = req.params.END;
      const calendar = await getCalendarByDates(start, end);
      res.json({ data: calendar });
    } catch (error) {
      next(error);
    }
  }
);

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
  '/:ID',
  validatorHandler(deleteCalendarSchema, 'params'),
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
