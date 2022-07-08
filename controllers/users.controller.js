import db from '../utils/db.util.js';
import Boom from '@hapi/boom';
import { hash } from 'bcrypt';

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

const getUser = async (id) => {
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

const createUser = async (user) => {
  const id = user.ID_USER;
  const userExists = await getUser(id);
  if (userExists) {
    throw Boom.conflict('User already exists');
  }
  const sql = `
    INSERT INTO
      TBL_USERS
      (
        ID_USER,
        FIRST_NAME,
        LAST_NAME,
        EMAIL,
        PASSWORD,
        ID_PRODUCT_LINE,
        ACTIVE,
        PROFILE_PICTURE
      )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const passwordHash = await hash(user.PASSWORD, 10);
  const values = [
    user.ID_USER,
    user.FIRST_NAME,
    user.LAST_NAME,
    user.EMAIL,
    passwordHash,
    user.ID_PRODUCT_LINE,
    user.ACTIVE ? 1 : 0,
    user.PROFILE_PICTURE,
  ];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('User could not be created');
  }
  return 'User created successfully';
};

const updateUser = async (id, user) => {
  let sql = `
    UPDATE
      TBL_USERS
    SET
      FIRST_NAME = ?,
      LAST_NAME = ?,
      EMAIL = ?,
      ID_PRODUCT_LINE = ?,
      ACTIVE = ?,
      PROFILE_PICTURE = ?
    WHERE
      ID_USER = ?
  `;
  const values = [
    user.FIRST_NAME,
    user.LAST_NAME,
    user.EMAIL,
    user.ID_PRODUCT_LINE,
    user.ACTIVE ? 1 : 0,
    user.PROFILE_PICTURE,
    id,
  ];
  const newPassword = user.PASSWORD || '';
  if (newPassword.trim()) {
    const passwordHash = await hash(newPassword, 10);
    sql = `
      UPDATE
        TBL_USERS
      SET
        FIRST_NAME = ?,
        LAST_NAME = ?,
        EMAIL = ?,
        PASSWORD = ?,
        ID_PRODUCT_LINE = ?,
        ACTIVE = ?,
        PROFILE_PICTURE = ?
      WHERE
        ID_USER = ?
    `;
    values.splice(3, 0, passwordHash);
  }
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
    throw Boom.conflict('User could not be deleted');
  }
  return 'User deleted successfully';
};

export { getUsers, getUser, createUser, updateUser, deleteUser };
