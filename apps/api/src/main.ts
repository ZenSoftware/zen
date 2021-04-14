import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const port = process.env.PORT || environment.expressPort;

  const app = await NestFactory.create(AppModule, { cors: environment.cors });

  app.use(cookieParser());
  app.use(graphqlUploadExpress(environment.graphql.uploads));

  if (environment.production) app.use(helmet());

  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`);
  });
}

bootstrap();
