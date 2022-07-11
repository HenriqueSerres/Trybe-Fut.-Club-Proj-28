import { Router } from 'express';
import MatchController from '../controllers/matchController';
import Repository from '../repository/matchRepository';
import Service from '../services/matchSevice';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new MatchController(service);

  return controller;
};
const matchRoute = Router();

const controller = entityFactory();

matchRoute.get('/', (req, res, next) => {
  controller.getAllMatches(req, res, next);
});

export default matchRoute;
