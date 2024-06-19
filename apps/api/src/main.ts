import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: environment.cors });
  app.enableShutdownHooks();

  if (environment.helmet) {
    if (typeof environment.helmet === 'object') app.use(helmet(environment.helmet));
    else app.use(helmet());
    Logger.log('Using helmet');
  }

  const port = process.env.PORT || environment.expressPort;

  await app.listen(port, () => {
    Logger.log(`GraphQL server running at http://localhost:${port}/graphql`);
  });
}

bootstrap();
