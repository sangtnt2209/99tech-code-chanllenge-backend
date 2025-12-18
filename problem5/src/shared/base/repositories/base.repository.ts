import { Model, QueryFilter, UpdateQuery } from 'mongoose';
import { BaseDocument } from '../entities/base.entity';

export abstract class BaseRepository<T extends BaseDocument> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  create(data: Partial<T>): Promise<T> {
    const createdDocument = new this.model(data);
    return createdDocument.save();
  }

  update(id: string, data: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const res = await this.model.findByIdAndDelete(id).exec();
    if (!res) {
      return false;
    }
    return true;
  }

  findManyWithPagination(criteria: QueryFilter<T>, skip: number, limit: number): Promise<T[]> {
    return this.model
      .find(criteria)
      .skip(skip || 0)
      .limit(limit || 10)
      .sort({ createdAt: -1 }) // Default sort by newest
      .exec();
  }

  count(criteria: QueryFilter<T>): Promise<number> {
    return this.model.countDocuments(criteria).exec();
  }
}
