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

  async getTeam(req: Request, res: Response, next:NextFunction) {
    try {
      const { id } = req.params;
      const team = await this.service.getTeam(Number(id));
      return res.status(200).json(team);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
