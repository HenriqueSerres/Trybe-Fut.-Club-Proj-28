import * as jwt from 'jsonwebtoken';
import 'dotenv/config';
import { IUser } from '../interfaces/usersInterface';

const minhaSenha = process.env.JWT_SECRET || 'jwt_secret';

const jwtConfig:object = {
  expiresIn: '10d',
  algorithm: 'HS256',
};

const generateJWT = (payload: IUser) => {
  const token = jwt.sign({ data: payload }, minhaSenha, jwtConfig);

  return token;
};

export default generateJWT;
