import db from '../utils/db.util.js';

const getProductLines = async () => {
  const sql = 'SELECT * FROM TBL_PRODUCT_LINES';
  const results = await db(sql);
  return results;
};

export { getProductLines };
