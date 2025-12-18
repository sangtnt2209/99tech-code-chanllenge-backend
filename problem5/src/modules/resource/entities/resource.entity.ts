import { Schema, model } from 'mongoose';
import {
  BaseSchemaDefinition,
  BaseSchemaOptions,
  BaseDocument,
} from '../../../shared/base/entities/base.entity';

export interface ResourceDocument extends BaseDocument {
  resourceName: string;
  resourceDescription?: string;
}

const resourceSchema = new Schema<ResourceDocument>(
  {
    ...BaseSchemaDefinition,

    resourceName: {
      type: String,
      required: true,
      trim: true,
    },
    resourceDescription: {
      type: String,
      required: false,
    },
  },
  BaseSchemaOptions,
);

export const ResourceModel = model<ResourceDocument>('Resource', resourceSchema);
