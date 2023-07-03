import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { GameService, MainRoom } from './app/game';
import { PrismaService } from './app/prisma';
import { environment } from './environments/environment';

const ROOMS = [MainRoom];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: environment.cors });
  app.enableShutdownHooks();

  const prisma: PrismaService = app.get(PrismaService);
  prisma.enableShutdownHooks(app);

  if (environment.production) app.use(helmet());

  const port = process.env.PORT || environment.expressPort;

  const gameSvc = app.get(GameService);

  gameSvc.createServer(app.getHttpServer());

  for (const room of ROOMS) {
    gameSvc.defineRoom(room.name, room);
  }

  await app.listen(port, () => {
    Logger.log(`Colyseus monitor running at http://localhost:${port}/monitor`);
    Logger.log(`GraphQL server running at http://localhost:${port}/graphql`);
  });
}

bootstrap();
