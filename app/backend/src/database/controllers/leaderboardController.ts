import { Request, Response, NextFunction } from 'express';
import Service from '../services/leaderboardService';

export default class LeaderboardController {
  private service: Service;
  constructor() {
    this.service = new Service();
  }

  async getAllAtHome(req: Request, res: Response, next:NextFunction) {
    try {
      const boards = await this.service.getAllAtHome();
      return res.status(200).json(boards);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllAway(req: Request, res: Response, next:NextFunction) {
    try {
      const boards = await this.service.getAllAway();
      return res.status(200).json(boards);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
