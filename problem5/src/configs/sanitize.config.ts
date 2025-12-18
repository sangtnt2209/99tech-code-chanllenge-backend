import sanitizeHtml from 'sanitize-html';

export const sanitizeOptions: sanitizeHtml.IOptions = {
  allowedTags: ['b', 'i', 'em', 'strong', 'p', 'ul', 'li'],
  allowedAttributes: {},
};
