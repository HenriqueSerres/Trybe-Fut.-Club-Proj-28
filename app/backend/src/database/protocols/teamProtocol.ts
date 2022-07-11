import { ITeam } from '../interfaces/teamInterface';

export interface IService {
  getAllTeams(): Promise<ITeam[]>;
}

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
}
