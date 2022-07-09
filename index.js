import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { logError, errorHandler } from './middlewares/error.handler.js';
import { loginRouter, apiRouter } from './routes/index.js';
import validateSession from './middlewares/session.handler.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/login', loginRouter);
app.use('/api', validateSession, apiRouter);

app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
