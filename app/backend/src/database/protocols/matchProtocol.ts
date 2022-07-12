import { IMatch } from '../interfaces/matchInterface';

export interface IService {
  getAllMatches(): Promise<IMatch[]>;
  createMatches(body:object): Promise<IMatch>;
}

export interface IMatchModel {
  findAll(data:object): Promise<IMatch[]>;
  create(body:object): Promise<IMatch>;

}
