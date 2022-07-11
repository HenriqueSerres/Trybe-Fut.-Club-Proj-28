import { ITeam } from '../interfaces/teamInterface';

export interface IService {
  getAllTeams(): Promise<ITeam[]>;
  getTeam(id:string): Promise<ITeam>;
}

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findOne(id:string): Promise<ITeam>;

}
