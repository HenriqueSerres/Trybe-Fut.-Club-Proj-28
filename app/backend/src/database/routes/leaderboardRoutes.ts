import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
import Repository from '../repository/leaderboardRepository';
import Service from '../services/leaderboardSevice';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new LeaderboardController(service);

  return controller;
};
const leaderboardRoute = Router();

const controller = entityFactory();

leaderboardRoute.get('/home', (req, res, next) => {
  controller.getAllAtHome(req, res, next);
});

export default leaderboardRoute;
