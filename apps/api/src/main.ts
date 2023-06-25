import * as http from 'http';

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { GameService, MainRoom } from './app/game';
import { PrismaService } from './app/prisma';
import { environment } from './environments/environment';

const ROOMS = [MainRoom];

async function bootstrap() {
  const app = express();

  const nestApp = await NestFactory.create(AppModule, new ExpressAdapter(app));
  nestApp.enableShutdownHooks();
  if (environment.cors) {
    nestApp.enableCors(environment.cors);
  }
  nestApp.init();

  const prisma: PrismaService = nestApp.get(PrismaService);
  prisma.enableShutdownHooks(nestApp);

  if (environment.production) nestApp.use(helmet());

  const port = process.env.PORT || environment.expressPort;

  const httpServer = http.createServer(app);

  const gameSvc = nestApp.get(GameService);

  gameSvc.createServer(httpServer);

  ROOMS.forEach(r => {
    console.info(`Registering room: ${r.name}`);
    gameSvc.defineRoom(r.name, r);
  });

  gameSvc.listen(+7081)?.then(() => {
    Logger.log(`Colyseus server running at http://localhost:${7081}/monitor`);
    // Globals.nestApp = nestApp;
  });

  await nestApp.listen(port, () => {
    Logger.log(`GraphQL server running at http://localhost:${port}/graphql`);
  });
}

bootstrap();
