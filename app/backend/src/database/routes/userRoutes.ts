import { Router } from 'express';
import UserController from '../controllers/userController';
import verifyToken from '../middleware/verifyToken';
import verifyUser from '../middleware/verifyUsers';
import Repository from '../repository/userRepository';
import Service from '../services/userService';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new UserController(service);

  return controller;
};
const userRoute = Router();

const controller = entityFactory();

userRoute.post('/', verifyUser, (req, res, next) => {
  controller.login(req, res, next);
});
userRoute.get('/validate', verifyToken, (req, res, _next) => {
  const { role } = req.body.user;
  res.status(200).json({ role });
});

export default userRoute;
