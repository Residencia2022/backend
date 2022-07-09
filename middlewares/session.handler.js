import { getUserByToken } from '../controllers/users.controller.js';
import Boom from '@hapi/boom';

const validateSession = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    next(Boom.unauthorized('No session'));
    return;
  }
  const user = await getUserByToken(token);
  if (!user) {
    next(Boom.notFound('Invalid session'));
    return;
  }
  next();
};

export default validateSession;
