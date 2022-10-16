import { createConnection } from 'mysql2/promise';

const db = async (sql, values) => {
  const connection = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });
  const [results] = await connection.execute(sql, values);
  await connection.end();
  return results;
};

export default db;

// Server parameters: require_secure_transport=OFF
