import { IMatch } from '../interfaces/matchInterface';
import { IMatchModel } from '../protocols/matchProtocol';
import Teams from '../models/team';

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

  async createMatches(body:object): Promise<IMatch> {
    const match = await this.model.create({ ...body, inProgress: true });

    return match;
  }

  async updateMatches(id:number): Promise<void> {
    const match = await this.model.update({ inProgress: false }, { where: { id } });

    return match;
  }
}
