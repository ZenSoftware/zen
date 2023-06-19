import './tracing';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { PrismaService } from './app/prisma';
import { environment } from './environments/environment';

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule, { cors: environment.cors });
  nestApp.enableShutdownHooks();

  const prisma: PrismaService = nestApp.get(PrismaService);
  prisma.enableShutdownHooks(nestApp);

  if (environment.production) nestApp.use(helmet());

  const port = process.env.PORT || environment.expressPort;

  await nestApp.listen(port, () => {
    Logger.log(`GraphQL server running at http://localhost:${port}/graphql`);
  });
}

bootstrap();
