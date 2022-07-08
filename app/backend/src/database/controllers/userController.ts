import { Request, Response, NextFunction } from 'express';
import { IService } from '../protocols/userProtocol';

export default class UserController {
  constructor(private service: IService) {
    this.service = service;
  }

  async login(req: Request, res: Response, next:NextFunction) {
    try {
      const token = await this.service.login(req.body);
      return res.status(200).json({ token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
