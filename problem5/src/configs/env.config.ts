import dotenv from 'dotenv';
import { cleanEnv, str, port } from 'envalid';
import { APPLICATION_ENV } from '../shared/constants';

dotenv.config();

// Validate and sanitize environment variables
const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: Object.values(APPLICATION_ENV) }),
  PORT: port({ default: 3000 }),
  LOG_LEVEL: str({ default: 'info' }),
  MONGO_URI: str(),
});

export default env;
