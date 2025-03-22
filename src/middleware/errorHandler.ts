import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { CustomError } from '../utils/errors';
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errors = null;

  if (err instanceof ZodError) {
    statusCode = 400;
    message = 'Validation failed';
    errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }));
  } else if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  logger.error(`[ERROR] ${req.method} ${req.url} - ${message} - ${err.stack}`);

  res.status(statusCode).json({
    message,
    errors,
  });
};

export default errorHandler;
