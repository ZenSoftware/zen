import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import { ConfigService } from '../../config';

export class EmailTakenException extends HttpException {
  constructor() {
    super('USER_ALREADY_EXISTS', HttpStatus.CONFLICT);
  }
}

@Catch(EmailTakenException)
export class UserAlreadyExistsExceptionFilter implements ExceptionFilter {
  constructor(private readonly config: ConfigService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    res.redirect(`${this.config.siteUrl}/login?email_taken=true`);
  }
}
