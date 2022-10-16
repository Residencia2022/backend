import { createConnection } from 'mysql2/promise';
import { readFileSync } from 'fs';

const DB_CA = [readFileSync('./DigiCertGlobalRootCA.crt.pem', 'utf8')];

const db = async (sql, values) => {
  const connection = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: {
      rejectUnauthorized: true,
      ca: DB_CA,
    },
  });
  const [results] = await connection.execute(sql, values);
  await connection.end();
  return results;
};

export default db;
