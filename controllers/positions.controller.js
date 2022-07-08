import db from '../utils/db.util.js';

const getPositions = async () => {
  const sql = 'SELECT * FROM TBL_POSITIONS';
  const results = await db(sql);
  return results;
};

export { getPositions };
