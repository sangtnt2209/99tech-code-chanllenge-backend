import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';
import Logger from '../shared/utils/logger.util';

export const errorMiddleware = (
  error: HttpException | Error,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const status = error instanceof HttpException ? error.status : 500;

  const message = error.message || 'Something went wrong';

  if (status === 500) {
    Logger.error(`[Error] ${req.method} ${req.path}:`, error);
  }

  res.status(status).json({
    success: false,
    status,
    message,
    ...(error instanceof HttpException && error.details && { details: error.details }),
  });
};
