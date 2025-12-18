import mongoose from 'mongoose';
import { Request, Response } from 'express';
import { autoInjectable } from 'tsyringe';

@autoInjectable()
export class HealthController {
  public getHealthStatus = (req: Request, res: Response) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    const dbStatus = mongoose.connection.readyState === 1 ? 'up' : 'down';

    const healthStatus = {
      status: dbStatus === 'up' ? 'healthy' : 'unhealthy',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      checks: {
        database: dbStatus,
        server: 'up',
      },
    };

    if (dbStatus === 'up') {
      return res.status(200).json(healthStatus);
    } else {
      return res.status(503).json(healthStatus);
    }
  };
}
