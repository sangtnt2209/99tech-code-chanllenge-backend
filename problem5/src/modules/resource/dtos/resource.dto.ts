import { PaginationRequestDto } from '../../../shared/base/dtos/pagination.dto';
import { IsBoolean, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class SearchResourceRequestDto extends PaginationRequestDto {
  @IsString()
  @IsOptional()
  resourceName?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}

export class CreateResourceRequestDto {
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  resourceName: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  resourceDescription?: string;
}

export class UpdateResourceRequestDto {
  @IsString()
  @MaxLength(255)
  @MinLength(1)
  @IsOptional()
  resourceName: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  @MinLength(1)
  resourceDescription?: string;

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
