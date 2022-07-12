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

export { createIntern };
