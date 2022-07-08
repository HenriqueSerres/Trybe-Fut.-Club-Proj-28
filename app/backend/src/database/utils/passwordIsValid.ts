import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces/userInterface';

const passIsValid = async (passRequest:IUser['password'], password:IUser['password']) => {
  const isValid = await bcrypt.compare(passRequest, password);
  return isValid;
};

export default passIsValid;
