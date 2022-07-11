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

    return res.status(200).json({ role: data.role });

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
  next();
};

export default tokenIsValid;
