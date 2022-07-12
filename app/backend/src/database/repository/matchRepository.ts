import { IMatch } from '../interfaces/matchInterface';
import Model from '../models/match';
import { IMatchModel } from '../protocols/matchProtocol';

type options = { where: object };

export default class MatchRepository implements IMatchModel {
  findAll = async (data:object): Promise<IMatch[]> => {
    const allMatches = await Model.findAll(data);
    return allMatches as unknown as IMatch[];
  };

  create = async (body:object): Promise<IMatch> => {
    const match = await Model.create(body);
    return match as IMatch;
  };

  update = async (match:object, data:options): Promise<void> => {
    await Model.update(match, data);
  };
}
