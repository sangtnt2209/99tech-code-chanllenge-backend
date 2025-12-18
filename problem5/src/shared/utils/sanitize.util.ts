import sanitizeHtml from 'sanitize-html';
import { sanitizeOptions } from '../../configs/sanitize.config';

export const sanitizeData = (data: any): any => {
  if (typeof data === 'string') {
    return sanitizeHtml(data, sanitizeOptions);
  }
  if (Array.isArray(data)) {
    return data.map(sanitizeData);
  }
  if (typeof data === 'object' && data !== null) {
    return Object.keys(data).reduce((acc, key) => {
      acc[key] = sanitizeData(data[key]);
      return acc;
    }, {} as any);
  }
  return data;
};
