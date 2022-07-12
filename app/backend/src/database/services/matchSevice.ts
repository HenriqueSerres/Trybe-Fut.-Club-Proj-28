import { IMatch } from '../interfaces/matchInterface';
import { IMatchModel } from '../protocols/matchProtocol';
import Teams from '../models/team';
import HandleError from '../utils/handleError';
import TeamRepository from '../repository/teamRepository';

const Team = new TeamRepository();

export default class MatchService {
  constructor(private model: IMatchModel) {
    this.model = model;
  }

  async getAllMatches(): Promise<IMatch[]> {
    const allMatches = await this.model.findAll({
      include: [
        { model: Teams, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Teams, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return allMatches;
  }

  async createMatches(body:IMatch): Promise<IMatch> {
    const home = await Team.findOne(body.homeTeam);
    const away = await Team.findOne(body.awayTeam);

    if (!home || !away) {
      throw new HandleError(404, 'There is no team with such id!');
    }

    if (body.homeTeam === body.awayTeam) {
      throw new HandleError(401, 'It is not possible to create a match with two equal teams');
    }
    const match = await this.model.create({ ...body, inProgress: true });

    return match;
  }

  async updateMatches(id:number): Promise<void> {
    const match = await this.model.update({ inProgress: false }, { where: { id } });

    return match;
  }
}
