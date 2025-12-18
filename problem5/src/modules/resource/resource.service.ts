import { autoInjectable, injectable } from 'tsyringe';
import { ResourceRepository } from './resource.repository';
import {
  CreateResourceRequestDto,
  SearchResourceRequestDto,
  UpdateResourceRequestDto,
} from './dtos/resource.dto';
import { convertPagination } from '../../shared/utils/convert-pagination.util';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '../../exceptions';
import { PaginationResponseDto } from '../../shared/base/dtos/pagination.dto';
import { ResourceDocument } from './entities/resource.entity';
import { validateRequest } from '../../shared/utils/validate-request.utils';

@autoInjectable()
@injectable()
export class ResourceService {
  constructor(private readonly resourceRepository: ResourceRepository) {}

  public searchResources = async (
    searchResourceRequest: SearchResourceRequestDto,
  ): Promise<PaginationResponseDto<ResourceDocument>> => {
    await validateRequest(SearchResourceRequestDto, searchResourceRequest);

    const { skip, limit } = convertPagination(
      searchResourceRequest.page,
      searchResourceRequest.limit,
    );

    for (const key in searchResourceRequest) {
      if (searchResourceRequest[key] === undefined) {
        delete searchResourceRequest[key];
      }
    }

    // Use Promise.all to run both queries in parallel
    const [data, totalRecords] = await Promise.all([
      this.resourceRepository.findManyWithPagination(searchResourceRequest, skip, limit),
      this.resourceRepository.count(searchResourceRequest),
    ]);

    return new PaginationResponseDto<ResourceDocument>(
      data,
      searchResourceRequest.page,
      searchResourceRequest.limit,
      totalRecords,
    );
  };

  public createResource = async (createResourceRequest: CreateResourceRequestDto) => {
    await validateRequest(CreateResourceRequestDto, createResourceRequest);

    return this.resourceRepository.create({
      resourceName: createResourceRequest.resourceName,
      resourceDescription: createResourceRequest.resourceDescription,
    });
  };

  public deleteResource = async (resourceId: string) => {
    const existingResource = await this.resourceRepository.findById(resourceId);
    if (!existingResource) {
      throw new NotFoundException('Resource not found');
    }
    const res = await this.resourceRepository.delete(resourceId);

    if (!res) {
      throw new InternalServerErrorException('Failed to delete resource');
    }
  };

  public getResourceById = async (resourceId: string) => {
    const result = await this.resourceRepository.findById(resourceId);
    if (!result) throw new NotFoundException('Resource not found');
    return result;
  };

  public updateResource = async (
    resourceId: string,
    updateData: Partial<UpdateResourceRequestDto>,
  ) => {
    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No data provided for update');
    }
    await validateRequest(UpdateResourceRequestDto, updateData);

    const existingResource = await this.resourceRepository.findById(resourceId);
    if (!existingResource) {
      throw new NotFoundException('Resource not found');
    }

    const res = await this.resourceRepository.update(
      resourceId,
      Object.assign(existingResource, updateData),
    );

    return res;
  };
}
