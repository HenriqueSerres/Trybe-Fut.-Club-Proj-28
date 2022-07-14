import { IBoard } from '../interfaces/leaderboardInterface';

export interface IService {
  getAllAtHome(): Promise<IBoard[]>;
  getAllAway(): Promise<IBoard[]>;
}

export interface IBoardModel {
  findAll(): Promise<IBoard[]>;

}
