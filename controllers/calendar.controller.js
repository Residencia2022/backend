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
    throw Boom.conflict('Event could not be created');
  }
  return 'Event created successfully';
};

const getCalendarByMonth = async (year, month) => {
  const sql = `
    SELECT
      C.ID_CALENDAR,
      C.ID_PRODUCT_LINE,
      P.PRODUCT_LINE,
      C.ID_SCHEDULE,
      S.LABEL,
      S.START_TIME,
      S.END_TIME,
      C.EMPLOYEE,
      C.DATES
    FROM
      TBL_CALENDAR C
    INNER JOIN
      TBL_PRODUCT_LINES P ON C.ID_PRODUCT_LINE = P.ID_PRODUCT_LINE
    INNER JOIN
      TBL_SCHEDULES S ON C.ID_SCHEDULE = S.ID_SCHEDULE
    WHERE
      DATES LIKE ?
    ORDER BY C.DATES ASC
  `;
  const values = [`%${year}-${month}%`];
  const results = await db(sql, values);
  return results;
};

const getCalendar = async () => {
  const sql = `
    SELECT
      C.ID_CALENDAR,
      C.ID_PRODUCT_LINE,
      P.PRODUCT_LINE,
      C.ID_SCHEDULE,
      S.LABEL,
      S.START_TIME,
      S.END_TIME,
      C.EMPLOYEE,
      C.DATES
    FROM
      TBL_CALENDAR C
    INNER JOIN
      TBL_PRODUCT_LINES P ON C.ID_PRODUCT_LINE = P.ID_PRODUCT_LINE
    INNER JOIN
      TBL_SCHEDULES S ON C.ID_SCHEDULE = S.ID_SCHEDULE
    ORDER BY C.DATES ASC
  `;
  const results = await db(sql);
  return results;
};

const deleteCalendar = async (id) => {
  const sql = 'DELETE FROM TBL_CALENDAR WHERE ID_CALENDAR = ?';
  const values = [id];
  const results = await db(sql, values);
  if (results.affectedRows === 0) {
    throw Boom.conflict('Event could not be deleted');
  }
  return 'Event deleted successfully';
};

export { createCalendar, getCalendarByMonth, getCalendar, deleteCalendar };
