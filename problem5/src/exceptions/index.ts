import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  constructor(message: string = 'Bad Request', details?: any) {
    super(400, message, details);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string = 'Unauthorized') {
    super(401, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = 'Resource not found') {
    super(404, message);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string = 'Internal Server Error') {
    super(500, message);
  }
}
