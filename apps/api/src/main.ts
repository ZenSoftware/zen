import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { graphqlUploadExpress } from 'graphql-upload';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: environment.cors });

  app.use(graphqlUploadExpress(environment.graphql.uploads));

  if (environment.production) app.use(helmet());

  const port = process.env.PORT || environment.expressPort;

  await app.listen(port, () => {
    Logger.log(`GraphQL server running at http://localhost:${port}/graphql`);
  });
}

bootstrap();
