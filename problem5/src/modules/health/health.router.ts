import express from 'express';
import { HealthController } from './health.controller';
import { container } from 'tsyringe';

const healthRouter = express.Router();

const healthController = container.resolve(HealthController);

healthRouter.get('/', healthController.getHealthStatus);

export default healthRouter;
