import { autoInjectable } from 'tsyringe';
import { Request, Response } from 'express';
import { ResourceService } from './resource.service';
import {
  CreateResourceRequestDto,
  SearchResourceRequestDto,
  UpdateResourceRequestDto,
} from './dtos/resource.dto';
import { plainToInstance } from 'class-transformer';

@autoInjectable()
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  public searchResources = async (req: Request, res: Response) => {
    res
      .status(200)
      .json(
        await this.resourceService?.searchResources(
          plainToInstance(SearchResourceRequestDto, req.query),
        ),
      );
  };

  public createResource = async (req: Request, res: Response) => {
    res
      .status(201)
      .json(
        await this.resourceService?.createResource(
          plainToInstance(CreateResourceRequestDto, req.body),
        ),
      );
  };

  public deleteResource = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.resourceService?.deleteResource(id);
    res.status(200).json({ id });
  };

  public getResourceById = async (req: Request, res: Response) => {
    const { id } = req.params;
    res.status(200).json(await this.resourceService?.getResourceById(id));
  };

  public updateResource = async (req: Request, res: Response) => {
    const { id } = req.params;
    res
      .status(200)
      .json(
        await this.resourceService?.updateResource(
          id,
          plainToInstance(UpdateResourceRequestDto, req.body),
        ),
      );
  };
}
