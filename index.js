import express from 'express';
import fileUpload from 'express-fileupload';

import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import { logError, errorHandler } from './middlewares/error.handler.js';
import { sessionsRouter, apiRouter } from './routes/index.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(fileUpload());

app.use('/login', sessionsRouter);
app.use('/api', apiRouter);
app.use('/files', express.static('uploads'));

app.use(logError);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
