import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { GameService, MainRoom } from './app/game';
import { PrismaService } from './app/prisma';
import { environment } from './environments/environment';

const ROOMS = [MainRoom];

async function bootstrap() {
  const nestApp = await NestFactory.create(AppModule, { cors: environment.cors });
  nestApp.enableShutdownHooks();

  const prisma: PrismaService = nestApp.get(PrismaService);
  prisma.enableShutdownHooks(nestApp);

  if (environment.production) nestApp.use(helmet());

  const port = process.env.PORT || environment.expressPort;

  const gameSvc = nestApp.get(GameService);

  gameSvc.createServer(nestApp.getHttpServer());

  ROOMS.forEach(r => {
    gameSvc.defineRoom(r.name, r);
  });

  await nestApp.listen(port, () => {
    Logger.log(`Colyseus monitor running at http://localhost:${port}/monitor`);
    Logger.log(`GraphQL server running at http://localhost:${port}/graphql`);
  });
}

bootstrap();
