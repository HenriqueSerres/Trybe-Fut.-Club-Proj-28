import { IMatch } from '../interfaces/matchInterface';

type options = { where: object };

export interface IService {
  getAllMatches(): Promise<IMatch[]>;
  createMatches(body:object): Promise<IMatch>;
  updateMatches(id:number): Promise<void>;
  updateInProgress(id:number, body:IMatch): Promise<void>;
}

export interface IMatchModel {
  findAll(data:object): Promise<IMatch[]>;
  create(body:object): Promise<IMatch>;
  update(match:object, data:options): Promise<void>;
}
