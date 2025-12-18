import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class PaginationRequestDto {
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  page: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  limit: number;
}

export class PaginationResponseDto<T> {
  constructor(items: T[], page: number = 1, limit: number = 10, totalRecords: number) {
    this.items = items;
    this.pagination = new Pagination(page, limit, totalRecords);
  }

  items: T[];
  pagination: Pagination;
}

export class Pagination {
  constructor(page: number = 1, limit: number = 10, totalRecords: number) {
    this.page = page;
    this.limit = limit;
    this.totalRecords = totalRecords;
    this.totalPages = Math.ceil(totalRecords / limit);
  }

  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
}
