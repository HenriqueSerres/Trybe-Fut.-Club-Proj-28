import { IUser } from '../interfaces/userInterface';
import Model from '../models/user';
import { IModel } from '../protocols/userProtocol';

export default class UserRepository implements IModel {
  findOne = async (body: object): Promise<IUser> => {
    const user = await Model.findOne(body);
    return user as IUser;
  };
}
