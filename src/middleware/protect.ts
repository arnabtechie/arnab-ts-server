import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.dev';
import { UserPayload } from '../types/userTypes';
import logger from '../utils/logger';

interface AuthRequest extends Request {
  user?: UserPayload;
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authorization')?.split(' ')[1] as string;
  if (!token) {
    res.status(401).json({ error: 'Access denied' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    req.user = decoded as UserPayload;
    next();
  } catch (error) {
    logger.error(`[ERROR] ${JSON.stringify(error)}`);
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
};

export default protect;
