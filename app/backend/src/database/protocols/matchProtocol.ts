import { IMatch } from '../interfaces/matchInterface';

export interface IService {
  getAllMatches(): Promise<IMatch[]>;
  // getTeam(id:number): Promise<IMatch>;
}

export interface IMatchModel {
  findAll(data:object): Promise<IMatch[]>;
  // findOne(id:number): Promise<IMatch>;

}
