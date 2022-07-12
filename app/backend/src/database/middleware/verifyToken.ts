import { RequestHandler, Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Idecode } from '../interfaces/decodeInterface';

const minhaSenha = process.env.JWT_SECRET || 'jwt_secret';

const tokenIsValid: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const decoded = jwt.verify(token, minhaSenha);

    const { data } = decoded as Idecode;
    req.body.user = data;

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default tokenIsValid;
