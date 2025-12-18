import { Router } from 'express';
import { ResourceController } from './resource.controller';
import { container } from 'tsyringe';
import { requestValidationMiddleware } from '../../middlewares/request-validation.middleware';
import {
  CreateResourceRequestDto,
  SearchResourceRequestDto,
  UpdateResourceRequestDto,
} from './dtos/resource.dto';

const resourceRouter = Router();

// Resolve the controller from the DI container
const resourceController = container.resolve(ResourceController);

resourceRouter.get(
  '/',
  requestValidationMiddleware(SearchResourceRequestDto, 'query'),
  resourceController.searchResources,
);

resourceRouter.get('/:id', resourceController.getResourceById);

resourceRouter.post(
  '/',
  requestValidationMiddleware(CreateResourceRequestDto),
  resourceController.createResource,
);

resourceRouter.patch(
  '/:id',
  requestValidationMiddleware(UpdateResourceRequestDto),
  resourceController.updateResource,
);

resourceRouter.delete('/:id', resourceController.deleteResource);

export default resourceRouter;
