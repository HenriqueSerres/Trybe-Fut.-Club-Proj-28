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
      const match = await this.service.createMatches(req.body);
      return res.status(201).json(match);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
