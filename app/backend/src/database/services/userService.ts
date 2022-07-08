import { IUser } from '../interfaces/userInterface';
import { IModel } from '../protocols/userProtocol';
import generateJWT from '../utils/generateToken';
import HandleError from '../utils/handleError';
import passIsValid from '../utils/passwordIsValid';

export default class UserService {
  constructor(private model:IModel) {
    this.model = model;
  }

  async login(body:IUser): Promise<string> {
    const user = await this.model.findOne({ where: { email: body.email } });

    if (!user) throw new HandleError(401, 'Incorrect email or password');

    const passValidate = await passIsValid(body.password, user.password);
    if (!passValidate) throw new HandleError(401, 'Incorrect email or password');

    const token = generateJWT(user);
    return token;
  }
}
