import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';
// import Repository from '../repository/leaderboardRepository';
// import Service from '../services/leaderboardService';

const entityFactory = () => {
  // const repository = new Repository();
  // const service = new Service();
  const controller = new LeaderboardController();

  return controller;
};
const leaderboardRoute = Router();

const controller = entityFactory();

leaderboardRoute.get('/home', (req, res, next) => {
  controller.getAllAtHome(req, res, next);
});

leaderboardRoute.get('/away', (req, res, next) => {
  controller.getAllAway(req, res, next);
});

export default leaderboardRoute;
