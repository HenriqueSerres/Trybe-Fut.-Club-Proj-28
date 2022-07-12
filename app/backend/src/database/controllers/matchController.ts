import { Request, Response, NextFunction } from 'express';
import { IService } from '../protocols/matchProtocol';

export default class MatchController {
  constructor(private service: IService) {
    this.service = service;
  }

  async getAllMatches(req: Request, res: Response, next:NextFunction) {
    try {
      const allMatches = await this.service.getAllMatches();
      return res.status(200).json(allMatches);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async createMatches(req: Request, res: Response, next:NextFunction) {
    try {
      const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = req.body;
      const match = await this.service.createMatches(
        {
          homeTeam,
          awayTeam,
          homeTeamGoals,
          awayTeamGoals,
        },
      );
      return res.status(201).json(match);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateMatches(req: Request, res: Response, next:NextFunction) {
    try {
      const { id } = req.params;
      await this.service.updateMatches(Number(id));
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
