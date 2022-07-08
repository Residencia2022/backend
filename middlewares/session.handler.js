import { getUser } from '../controllers/users.controller.js';
import Boom from '@hapi/boom';

const validateSession = async (req, res, next) => {
  const id = req.headers.id_user;
  if (!id) {
    next(Boom.unauthorized('No session'));
  }
  const user = await getUser(id);
  if (!user) {
    next(Boom.unauthorized('Invalid session'));
  }
  next();
};

export default validateSession;
