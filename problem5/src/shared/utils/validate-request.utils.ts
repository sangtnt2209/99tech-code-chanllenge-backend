import { validate } from 'class-validator';
import { BadRequestException } from '../../exceptions';
import { plainToInstance } from 'class-transformer';

export const validateRequest = async (type: any, instance: any) => {
  const dtoInstance = plainToInstance(type, instance, {
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
    throw new BadRequestException('Validation failed', formattedErrors);
  }
};
