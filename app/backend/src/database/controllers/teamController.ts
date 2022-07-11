import { Request, Response, NextFunction } from 'express';
import { IService } from '../protocols/teamProtocol';

export default class TeamController {
  constructor(private service: IService) {
    this.service = service;
  }

  async getAllTeams(req: Request, res: Response, next:NextFunction) {
    try {
      const allTeams = await this.service.getAllTeams();
      return res.status(200).json(allTeams);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
