import { IMatch } from '../interfaces/matchInterface';
import Model from '../models/match';
import { IMatchModel } from '../protocols/matchProtocol';

export default class MatchRepository implements IMatchModel {
  findAll = async (body:object): Promise<IMatch[]> => {
    const allMatches = await Model.findAll(body);
    return allMatches as unknown as IMatch[];
  };
}
