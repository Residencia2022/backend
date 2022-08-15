import Boom from '@hapi/boom';
import { getUserByToken } from '../controllers/sessions.controller.js';

const validateSession = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      next(Boom.unauthorized('No session'));
      return;
    }
    await getUserByToken(token);
    next();
  } catch (error) {
    next(error);
  }
};

export default validateSession;
