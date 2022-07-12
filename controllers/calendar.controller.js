import db from '../utils/db.util.js';
import Boom from '@hapi/boom';

const createCalendar = async (calendar) => {
  const sql = `
    INSERT INTO
      TBL_CALENDAR
      (
        ID_CALENDAR,
        ID_PRODUCT_LINE,
        ID_SCHEDULE,
        EMPLOYEE,
        DATES
      )
    VALUES
      (NULL, ?, ?, ?, ?)
  `;
  const values = [
    calendar.ID_PRODUCT_LINE,
    calendar.ID_SCHEDULE,
    calendar.EMPLOYEE,
    calendar.DATES,
  ];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('Calendar could not be created');
  }
  return 'Calendar created successfully';
};

const deleteCalendar = async (id) => {
  const sql = 'DELETE FROM TBL_CALENDAR WHERE ID_CALENDAR = ?';
  const values = [id];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('Calendar could not be deleted');
  }
  return 'Calendar deleted successfully';
};

export { createCalendar, deleteCalendar };
