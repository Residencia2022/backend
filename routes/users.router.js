import { Router } from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller.js';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from '../schemas/users.schema.js';

const usersRouter = Router();

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await getUsers();
    res.json({ data: users });
  } catch (error) {
    next(error);
  }
});

usersRouter.get(
  '/:ID',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.ID;
      const user = await getUserById(id);
      res.json({ data: user });
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const user = req.body;
      const createdUser = await createUser(user);
      res.status(201).json({ data: createdUser });
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.put(
  '/:ID',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.ID;
      const user = req.body;
      const updatedUser = await updateUser(id, user);
      res.json({ data: updatedUser });
    } catch (error) {
      next(error);
    }
  }
);

usersRouter.delete(
  '/:ID',
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.ID;
      const deletedUser = await deleteUser(id);
      res.json({ data: deletedUser });
    } catch (error) {
      next(error);
    }
  }
);

export default usersRouter;
