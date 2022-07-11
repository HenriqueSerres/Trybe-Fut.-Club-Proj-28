import { ITeam } from '../interfaces/teamInterface';

export interface IService {
  getAllTeams(): Promise<ITeam[]>;
  getTeam(id:number): Promise<ITeam>;
}

export interface ITeamModel {
  findAll(): Promise<ITeam[]>;
  findOne(id:number): Promise<ITeam>;

}
