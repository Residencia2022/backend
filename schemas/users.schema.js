import Joi from 'joi';

const ID_USER = Joi.string().min(2).max(20);
const TOKEN = Joi.string().guid();
const FIRST_NAME = Joi.string().min(2).max(100);
const LAST_NAME = Joi.string().min(2).max(150);
const EMAIL = Joi.string().max(100).email();
const PASSWORD = Joi.string().min(8).max(16);
const ID_PRODUCT_LINE = Joi.number().integer().min(1).max(6);
const ACTIVE = Joi.number().integer().min(0).max(1);
const PROFILE_PICTURE = Joi.string().max(100).uri();

const createUserSchema = Joi.object({
  ID_USER: ID_USER.required(),
  FIRST_NAME: FIRST_NAME.required(),
  LAST_NAME: LAST_NAME.required(),
  EMAIL: EMAIL.required(),
  PASSWORD: PASSWORD.required(),
  ID_PRODUCT_LINE: ID_PRODUCT_LINE.required(),
  ACTIVE: ACTIVE.required(),
  PROFILE_PICTURE: PROFILE_PICTURE,
});

const getUserSchema = Joi.object({
  ID: ID_USER.required(),
});

const getUserByEmailSchema = Joi.object({
  EMAIL: EMAIL.required(),
  PASSWORD: PASSWORD.required(),
});

const getUserByTokenSchema = Joi.object({
  TOKEN: TOKEN.required(),
});

const updateUserSchema = Joi.object({
  FIRST_NAME: FIRST_NAME,
  LAST_NAME: LAST_NAME,
  EMAIL: EMAIL,
  PASSWORD: PASSWORD,
  ID_PRODUCT_LINE: ID_PRODUCT_LINE,
  ACTIVE: ACTIVE,
  PROFILE_PICTURE: PROFILE_PICTURE,
});

export {
  createUserSchema,
  getUserSchema,
  getUserByEmailSchema,
  getUserByTokenSchema,
  updateUserSchema,
};
