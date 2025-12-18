import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export function requestValidationMiddleware(
  type: any,
  source: 'body' | 'query' | 'params' = 'body',
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(type, req[source], {
      enableImplicitConversion: true,
    });

    const errors = await validate(dtoInstance, {
      whitelist: true,
    });

    if (errors.length > 0) {
      const formattedErrors = errors.map((error) => ({
        field: error.property,
        errors: Object.values(error.constraints || {}),
      }));

      return res.status(400).json({
        success: false,
        status: 400,
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    next();
  };
}
