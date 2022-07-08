import * as Joi from 'joi';
import { RequestHandler } from 'express';

const USER = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const verifyUser: RequestHandler = (req, res, next) => {
  const { error } = USER.validate(req.body);
  console.log(error);
  if (error?.message.includes('empty')) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  if (error?.message.includes('required')) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

export default verifyUser;
