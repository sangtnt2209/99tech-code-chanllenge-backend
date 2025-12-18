import { Document } from 'mongoose';

export interface BaseDocument extends Document {
  createdBy?: string;
  updatedBy?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const BaseSchemaDefinition = {
  createdBy: { type: String, required: false },
  updatedBy: { type: String, required: false },
  isActive: { type: Boolean, default: true },
};

export const BaseSchemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (_doc: any, ret: any) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  },
};
