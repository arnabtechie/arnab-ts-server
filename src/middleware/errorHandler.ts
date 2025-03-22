import { Request, Response } from 'express';
import { CustomError } from '../utils/errors';
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response) => {
  let statusCode = 500;
  let message = 'Internal Server Error';

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  logger.error(`[ERROR] ${req.method} ${req.url} - ${message}`);

  res.status(statusCode).json({
    error: message,
  });
};

export default errorHandler;
