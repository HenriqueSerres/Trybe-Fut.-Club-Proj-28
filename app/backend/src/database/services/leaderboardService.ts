import { ITeam } from '../interfaces/teamInterface';
import { IBoard } from '../interfaces/leaderboardInterface';
import MatchModel from '../models/match';
import TeamModel from '../models/team';
import { getOrderSort, homeBoardFormat, teamsFiltered } from '../utils/leaderboardData';

export default class LeaderBoardService {
  getAllAtHome = async (): Promise<IBoard[]> => {
    const allTeams = await TeamModel.findAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });
    const teams = allTeams.map((team:ITeam) => {
      const homeMatches = teamsFiltered(allMatches, 'home', team.id);
      const board = homeBoardFormat(homeMatches);
      return { name: team.teamName, ...board };
    });
    return getOrderSort(teams);
  };

  getAllAway = async (): Promise<IBoard[]> => {
    const allTeams = await TeamModel.findAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });
    const teams = allTeams.map((team:ITeam) => {
      const awayMatches = teamsFiltered(allMatches, 'away', team.id);
      const board = homeBoardFormat(awayMatches);
      return { name: team.teamName, ...board };
    });
    return getOrderSort(teams);
  };
}
