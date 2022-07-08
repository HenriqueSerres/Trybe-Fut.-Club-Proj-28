import { IUser } from '../interfaces/userInterface';

export interface IService {
  login(body:object): Promise<string>;
}

export interface IModel {
  findOne(body:object): Promise<IUser>;
}
