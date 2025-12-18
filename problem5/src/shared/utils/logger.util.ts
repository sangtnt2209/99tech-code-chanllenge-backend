import winston from 'winston';
import { LOG_COLORS, LOG_LEVEL } from '../constants';
import env from '../../configs/env.config';

winston.addColors(LOG_COLORS);

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
);

const transports = [new winston.transports.Console()];

const Logger = winston.createLogger({
  level: env.LOG_LEVEL,
  levels: LOG_LEVEL,
  format,
  transports,
});

export default Logger;
