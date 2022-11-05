import Joi from 'joi';

const ID_INTERN = Joi.number().integer().min(0);
const FIRST_NAME = Joi.string().min(2).max(100);
const LAST_NAME = Joi.string().min(2).max(150);
const DEGREE = Joi.string().min(2).max(100);
const INTEREST = Joi.string().min(2).max(250);
const MOTIVATION = Joi.string().min(2).max(250);
const EXPERIENCE = Joi.string().min(2).max(250);
const ENGLISH_LEVEL = Joi.string().length(2);
const ID_POSITION = Joi.number().integer().min(1).max(3);
const PHONE_NUMBER = Joi.string().length(13);
const EMAIL = Joi.string().max(100).email();
const CV = Joi.string().max(100).uri();
const STATUS = Joi.string().valid('pending', 'accepted', 'rejected');

const createInternSchema = Joi.object({
  FIRST_NAME: FIRST_NAME.required(),
  LAST_NAME: LAST_NAME.required(),
  DEGREE: DEGREE.required(),
  INTEREST: INTEREST.required(),
  MOTIVATION: MOTIVATION.required(),
  EXPERIENCE: EXPERIENCE.required(),
  ENGLISH_LEVEL: ENGLISH_LEVEL.required(),
  ID_POSITION: ID_POSITION.required(),
  PHONE_NUMBER: PHONE_NUMBER.required(),
  EMAIL: EMAIL.required(),
  CV: CV.required(),
});

const updateInternSchema = Joi.object({
  STATUS: STATUS.required(),
  ID: ID_INTERN.required(),
});

const getInternSchema = Joi.object({
  ID: ID_INTERN.required(),
});

export { createInternSchema, updateInternSchema, getInternSchema };
