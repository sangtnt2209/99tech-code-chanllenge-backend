import { Request, Response, NextFunction } from 'express';

export const apiResponseMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json;

  res.json = function (body) {
    if (res.statusCode >= 400) {
      return originalJson.call(this, body);
    }

    const formattedResponse = {
      success: true,
      status: res.statusCode,
      message: 'success',
      data: body || null,
    };

    return originalJson.call(this, formattedResponse);
  };

  next();
};
