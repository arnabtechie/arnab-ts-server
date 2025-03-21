import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errors';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  console.error(`[ERROR] ${req.method} ${req.url} - ${message}`);

  res.status(statusCode).json({
    error: message,
  });
};

export default errorHandler;
