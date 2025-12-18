import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import { sanitizeData } from '../shared/utils/sanitize.util';

export const helmetSecurityMiddleware = helmet({
  // Content Security Policy (CSP)
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", 'data:', 'https:'], // Allow images from Cloudinary/S3
      connectSrc: ["'self'"], // Allow AJAX calls to Stripe
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },

  // Cross-Origin Resource Policy (CORP)
  crossOriginResourcePolicy: { policy: 'cross-origin' },

  // Prevent MIME type sniffing
  noSniff: true,

  // Hide X-Powered-By
  // Removes "Express" from the headers to make fingerprinting harder.
  xPoweredBy: false,

  // Set X-XSS-Protection header
  xssFilter: true,

  // Prevent clickjacking by restricting iframe embedding
  frameguard: {
    action: 'deny',
  },
});

export const xssSanitizerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    req.body = sanitizeData(req.body);
  }

  if (req.query) {
    for (const key in req.query) {
      req.query[key] = sanitizeData(req.query[key]);
    }
  }

  if (req.params) {
    for (const key in req.params) {
      req.params[key] = sanitizeData(req.params[key]);
    }
  }

  next();
};
