import { ITeam } from '../interfaces/teamInterface';
import Model from '../models/team';
import { ITeamModel } from '../protocols/teamProtocol';

export default class TeamRepository implements ITeamModel {
  findAll = async (): Promise<ITeam[]> => {
    const allTeams = await Model.findAll();
    return allTeams;
  };

  findOne = async (id: number): Promise<ITeam> => {
    const team = await Model.findOne({ where: { id } });
    return team as ITeam;
  };
}
