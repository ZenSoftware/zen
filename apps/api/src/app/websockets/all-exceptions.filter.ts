import { ArgumentsHost, Catch, Logger } from '@nestjs/common';
import { BaseWsExceptionFilter } from '@nestjs/websockets';

@Catch()
export class AllExceptionsFilter extends BaseWsExceptionFilter {
  private logger: Logger = new Logger('ZenGateway');

  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
