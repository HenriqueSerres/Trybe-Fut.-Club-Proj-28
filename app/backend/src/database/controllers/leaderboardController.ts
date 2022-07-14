import { Request, Response, NextFunction } from 'express';
import { IService } from '../protocols/teamProtocol';

export default class LeaderboardController {
  constructor(private service: IService) {
    this.service = service;
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
}
