import { BadRequestException } from '../../exceptions';

export const convertPagination = (page: number, limit: number) => {
  if (page < 1 || limit < 1) {
    throw new BadRequestException('Page and limit must be greater than 0');
  }
  if (!page) page = 1;
  if (!limit) limit = 10;
  const skip = (page - 1) * limit;
  return { skip, limit };
};
