import db from '../utils/db.util.js';

const getSchedules = async () => {
  const sql = 'SELECT * FROM TBL_SCHEDULES';
  const results = await db(sql);
  return results;
};

export { getSchedules };
