import 'reflect-metadata'; // used for dependency injection and reflect metadata
import express, { Request, Response, Application } from 'express';
import morganMiddleware from './middlewares/morgan.middleware';
import env from './configs/env.config';
import Logger from './shared/utils/logger.util';
import cors from 'cors';
import { corsOptions } from './configs/cors.config';
import {
  helmetSecurityMiddleware,
  xssSanitizerMiddleware,
} from './middlewares/security.middleware';
import router from './routes';
import { errorMiddleware } from './middlewares/error.middleware';
import { apiResponseMiddleware } from './middlewares/api-response.middleware';
import { MongoDbContext } from './configs/mongo-db.config';

async function bootstrap() {
  const app: Application = express();

  try {
    await configure(app);

    app.listen(env.PORT);

    logAppPath();
  } catch (error) {
    const stack = error instanceof Error ? error.stack : '';
    Logger.error('Failed to start application', stack);
    process.exit();
  }
}

function logAppPath(): void {
  Logger.info(`Application is running on port: ${env.PORT}`);
}

async function configure(app: Application): Promise<void> {
  await MongoDbContext.connect();
  // Body parser middleware
  app.use(express.json());

  // Security middlewares
  app.use(cors(corsOptions));
  app.use(helmetSecurityMiddleware);
  app.use(xssSanitizerMiddleware);

  // Using morgan middleware for logging HTTP requests
  app.use(morganMiddleware);

  // API response formatter middleware
  app.use(apiResponseMiddleware);

  app.use('/api', router);

  app.use(errorMiddleware);
}

void bootstrap();
