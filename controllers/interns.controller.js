import db from '../utils/db.util.js';
import Boom from '@hapi/boom';

const createIntern = async (intern) => {
  const sql = `
    INSERT INTO
      TBL_INTERNS
      (
        ID_INTERN,
        FIRST_NAME,
        LAST_NAME,
        DEGREE,
        INTEREST,
        MOTIVATION,
        EXPERIENCE,
        ENGLISH_LEVEL,
        ID_POSITION,
        PHONE_NUMBER,
        EMAIL,
        CV
      )
    VALUES
      (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    intern.FIRST_NAME,
    intern.LAST_NAME,
    intern.DEGREE,
    intern.INTEREST,
    intern.MOTIVATION,
    intern.EXPERIENCE,
    intern.ENGLISH_LEVEL,
    intern.ID_POSITION,
    intern.PHONE_NUMBER,
    intern.EMAIL,
    intern.CV,
  ];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('An error has occurred, please try again later');
  }
  return 'Successful application';
};

const deleteIntern = async (id) => {
  const sql = 'DELETE FROM TBL_INTERNS WHERE ID_INTERN = ?';
  const values = [id];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('An error has occurred, please try again later');
  }
  return 'Application deleted successfully';
};

const getIntern = async (id) => {
  const sql = 'SELECT * FROM TBL_INTERNS WHERE ID_INTERN = ?';
  const values = [id];
  const results = await db(sql, values);
  if (!results[0]) {
    throw Boom.notFound('Application not found');
  }
  return results[0];
};

const getInterns = async () => {
  const sql = 'SELECT * FROM TBL_INTERNS';
  const results = await db(sql);
  return results;
};

export { createIntern, deleteIntern, getIntern, getInterns };
