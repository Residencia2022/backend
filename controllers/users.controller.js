import db from '../utils/db.util.js';
import Boom from '@hapi/boom';
import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

const getUsers = async () => {
  const sql = `
    SELECT
      ID_USER,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      ID_PRODUCT_LINE,
      ACTIVE,
      PROFILE_PICTURE,
      ROL
    FROM
      TBL_USERS
    ORDER BY
      ID_PRODUCT_LINE ASC
  `;
  const results = await db(sql);
  return results;
};

const getUserById = async (id) => {
  const sql = `
    SELECT
      ID_USER,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      ID_PRODUCT_LINE,
      ACTIVE,
      PROFILE_PICTURE,
      ROL
    FROM
      TBL_USERS
    WHERE
      ID_USER = ?
  `;
  const values = [id];
  const results = await db(sql, values);
  return results[0] || null;
};

const getUserByToken = async (token) => {
  const sql = `
    SELECT
      ID_USER,
      FIRST_NAME,
      LAST_NAME,
      EMAIL,
      ID_PRODUCT_LINE,
      ACTIVE,
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
  return results[0] || null;
};

const createUser = async (user) => {
  const id = user.ID_USER;
  const userExists = await getUserById(id);
  if (userExists) {
    throw Boom.conflict('User already exists');
  }
  const sql = `
    INSERT INTO
      TBL_USERS
      (
        ID_USER,
        TOKEN,
        FIRST_NAME,
        LAST_NAME,
        EMAIL,
        PASSWORD,
        ID_PRODUCT_LINE,
        ACTIVE,
        PROFILE_PICTURE
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const passwordHash = await hash(user.PASSWORD, 10);
  const values = [
    user.ID_USER,
    uuidv4(),
    user.FIRST_NAME,
    user.LAST_NAME,
    user.EMAIL,
    passwordHash,
    user.ID_PRODUCT_LINE,
    user.ACTIVE,
    user.PROFILE_PICTURE ? user.PROFILE_PICTURE : '',
  ];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('User could not be created');
  }
  return 'User created successfully';
};

const updateUser = async (id, user) => {
  if (user.PASSWORD) {
    const passwordHash = await hash(user.PASSWORD, 10);
    user.PASSWORD = passwordHash;
    user.TOKEN = uuidv4();
  }
  const fields = [
    user.TOKEN ? `TOKEN = '${user.TOKEN}'` : null,
    user.FIRST_NAME ? `FIRST_NAME = '${user.FIRST_NAME}'` : null,
    user.LAST_NAME ? `LAST_NAME = '${user.LAST_NAME}'` : null,
    user.EMAIL ? `EMAIL = '${user.EMAIL}'` : null,
    user.PASSWORD ? `PASSWORD = '${user.PASSWORD}'` : null,
    user.ID_PRODUCT_LINE ? `ID_PRODUCT_LINE = ${user.ID_PRODUCT_LINE}` : null,
    user.ACTIVE !== undefined ? `ACTIVE = ${user.ACTIVE}` : null,
    user.PROFILE_PICTURE ? `PROFILE_PICTURE = '${user.PROFILE_PICTURE}'` : null,
  ];
  const sql = `
    UPDATE
      TBL_USERS
    SET
      ${fields.filter(Boolean).join(', ')}
    WHERE
      ID_USER = ?
  `;
  const values = [id];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('User could not be updated');
  }
  return 'User updated successfully';
};

const deleteUser = async (id) => {
  const sql = 'UPDATE TBL_USERS SET ACTIVE = 0 WHERE ID_USER = ?';
  const values = [id];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('User could not be archived');
  }
  return 'User archived successfully';
};

export {
  getUsers,
  getUserById,
  getUserByToken,
  createUser,
  updateUser,
  deleteUser,
};
