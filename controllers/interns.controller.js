import db from '../utils/db.util.js';
import Boom from '@hapi/boom';

const getInterns = async () => {
  const sql = 'SELECT * FROM TBL_INTERNS';
  const results = await db(sql);
  return results;
};

const getInternById = async (id) => {
  const sql = 'SELECT * FROM TBL_INTERNS WHERE ID_INTERN = ?';
  const values = [id];
  const results = await db(sql, values);
  if (!results[0]) {
    throw Boom.notFound('Application not found');
  }
  return results[0];
};

const createIntern = async (intern) => {
  const sql = `
    INSERT INTO
      TBL_INTERNS
      (
        ID_INTERN,
        FIRST_NAME,
        DEGREE,
        SCHOOL,
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
    intern.DEGREE,
    intern.SCHOOL,
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

const updateIntern = async (id, status) => {
  const sql = 'UPDATE TBL_INTERNS SET CURRENT_STATUS = ? WHERE ID_INTERN = ?';
  const values = [status, id];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('An error has occurred, please try again later');
  }
  return 'Application updated successfully';
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

export { getInterns, getInternById, createIntern, updateIntern, deleteIntern };
