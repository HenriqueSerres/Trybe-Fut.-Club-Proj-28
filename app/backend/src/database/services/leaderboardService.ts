import { IBoard } from '../interfaces/leaderboardInterface';
import MatchModel from '../models/match';
import TeamModel from '../models/team';
import { putOnService } from '../utils/leaderboardData';

export default class LeaderBoardService {
  getAllAtHome = async (): Promise<IBoard[]> => {
    const allTeams = await TeamModel.findAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });

    const homeBoard = putOnService(allTeams, allMatches, 'home');
    return homeBoard;
  };

  getAllAway = async (): Promise<IBoard[]> => {
    const allTeams = await TeamModel.findAll();
    const allMatches = await MatchModel.findAll({ where: { inProgress: false } });

    const awayBoard = putOnService(allTeams, allMatches, 'away');
    return awayBoard;
  };
}
