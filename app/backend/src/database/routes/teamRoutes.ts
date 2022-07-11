import { Router } from 'express';
import TeamController from '../controllers/teamController';
// import verifyToken from '../middleware/verifyToken';
// import verifyUser from '../middleware/verifyUsers';
import Repository from '../repository/teamRepository';
import Service from '../services/teamService';

const entityFactory = () => {
  const repository = new Repository();
  const service = new Service(repository);
  const controller = new TeamController(service);

  return controller;
};
const teamRoute = Router();

const controller = entityFactory();

teamRoute.get('/', (req, res, next) => {
  controller.getAllTeams(req, res, next);
});

export default teamRoute;
