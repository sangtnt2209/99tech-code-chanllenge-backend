import { injectable } from 'tsyringe';
import { BaseRepository } from '../../shared/base/repositories/base.repository';
import { ResourceDocument, ResourceModel } from './entities/resource.entity';

@injectable()
export class ResourceRepository extends BaseRepository<ResourceDocument> {
  constructor() {
    super(ResourceModel);
  }
}
