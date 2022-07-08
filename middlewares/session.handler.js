import { getUser } from '../controllers/users.controller.js';
import Boom from '@hapi/boom';

const validateSession = async (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    next(Boom.unauthorized('No session'));
  }
  const user = await getUser(token);
  if (!user) {
    next(Boom.unauthorized('Invalid session'));
  }
  next();
};

export default validateSession;
