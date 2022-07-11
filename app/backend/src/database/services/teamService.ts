import { ITeam } from '../interfaces/teamInterface';
import { ITeamModel } from '../protocols/teamProtocol';

export default class TeamService {
  constructor(private model: ITeamModel) {
    this.model = model;
  }

  async getAllTeams(): Promise<ITeam[]> {
    const allTeams = await this.model.findAll();
    return allTeams;
  }
}
