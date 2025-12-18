import morgan, { StreamOptions } from 'morgan';
import Logger from '../shared/utils/logger.util';
import env from '../configs/env.config';

const stream: StreamOptions = {
  write: (message) => Logger.http(message.trim()),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// This warning is for production (optional).
const skip = () => {
  return env.NODE_ENV !== 'development';
};

const morganMiddleware = morgan(':method :url :status :res[content-length] - :response-time ms', {
  stream,
  skip,
});

export default morganMiddleware;
