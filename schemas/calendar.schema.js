import Joi from 'joi';

const ID_PRODUCT_LINE = Joi.number().integer().min(1).max(6);
const ID_SCHEDULE = Joi.number().integer().min(1).max(4);
const EMPLOYEE = Joi.string().min(1).max(50);
const DATES = Joi.date();

const createCalendarSchema = Joi.object({
  ID_PRODUCT_LINE: ID_PRODUCT_LINE.required(),
  ID_SCHEDULE: ID_SCHEDULE.required(),
  EMPLOYEE: EMPLOYEE.required(),
  DATES: DATES.required(),
});

export { createCalendarSchema };
