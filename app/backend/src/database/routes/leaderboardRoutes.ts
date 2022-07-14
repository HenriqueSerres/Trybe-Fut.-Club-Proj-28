import { Router } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const controller = new LeaderboardController();

const leaderboardRoute = Router();

leaderboardRoute.get('/home', (req, res, next) => {
  controller.getAllAtHome(req, res, next);
});

leaderboardRoute.get('/away', (req, res, next) => {
  controller.getAllAway(req, res, next);
});

export default leaderboardRoute;
