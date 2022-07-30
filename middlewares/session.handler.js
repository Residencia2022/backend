import { getUserByToken } from '../controllers/sessions.controller.js';
import Boom from '@hapi/boom';

const validateSession = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    next(Boom.unauthorized('No session'));
    return;
  }
  try {
    await getUserByToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateSession;
