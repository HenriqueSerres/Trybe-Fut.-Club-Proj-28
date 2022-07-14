import { IBoard } from '../interfaces/leaderboardInterface';
import { ITeam } from '../interfaces/teamInterface';
import Teams from '../models/team';
import Matches from '../models/match';
import { IBoardModel } from '../protocols/leaderboardProtocol';
import { getOrderSort, homeBoardFormat, teamsFiltered } from '../utils/leaderboardData';

export default class LeaderBoardRepository implements IBoardModel {
  findAll = async (): Promise<IBoard[]> => {
    const allTeams = await Teams.findAll();
    const allMatches = await Matches.findAll({ where: { inProgress: false } });
    const teams = allTeams.map((team:ITeam) => {
      const homeMatches = teamsFiltered(allMatches, 'home', team.id);
      const board = homeBoardFormat(homeMatches);
      return { name: team.teamName, ...board };
    });
    return getOrderSort(teams);
  };
}
