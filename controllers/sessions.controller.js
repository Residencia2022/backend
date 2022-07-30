import db from '../utils/db.util.js';
import { compare } from 'bcrypt';
import Boom from '@hapi/boom';

const login = async (email, password) => {
  const sql = `
    SELECT
      *
    FROM
      TBL_USERS
    WHERE
      EMAIL = ? AND
      ACTIVE = 1
  `;
  const values = [email];
  const results = await db(sql, values);
  const user = results[0] || null;
  if (!user) {
    throw Boom.notFound('User not found');
  }
  const isValid = await compare(password, user.PASSWORD);
  if (!isValid) {
    throw Boom.unauthorized('Invalid password');
  }
  return {
    ID_USER: user.ID_USER,
    TOKEN: user.TOKEN,
    FIRST_NAME: user.FIRST_NAME,
    LAST_NAME: user.LAST_NAME,
    EMAIL: user.EMAIL,
    ID_PRODUCT_LINE: user.ID_PRODUCT_LINE,
    PROFILE_PICTURE: user.PROFILE_PICTURE,
    ROL: user.ROL,
  };
};

const getUserByToken = async (token) => {
  const sql = `
    SELECT
      ID_USER,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      ID_PRODUCT_LINE,
      PROFILE_PICTURE,
      ROL
    FROM
      TBL_USERS
    WHERE
      TOKEN = ? AND
      ACTIVE = 1
  `;
  const values = [token];
  const results = await db(sql, values);
  const user = results[0] || null;
  if (!user) {
    throw Boom.notFound('Invalid session');
  }
  return user;
};

export { login, getUserByToken };
