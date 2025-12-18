import { Router } from 'express';
import resourceRouter from '../modules/resource/resource.router';
import healthRouter from '../modules/health/health.router';

const router = Router();

router.use('/resource', resourceRouter);
router.use('/health', healthRouter);

export default router;
