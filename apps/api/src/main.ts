import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';

import { AppModule } from './app/app.module';
import { GameService, MainRoom } from './app/game';
import { environment } from './environments/environment';

const ROOMS = [MainRoom];

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: environment.cors });
  app.enableShutdownHooks();

  if (environment.helmet) {
    if (typeof environment.helmet === 'object') app.use(helmet(environment.helmet));
    else app.use(helmet());
    Logger.log('Using helmet');
  }

  const port = process.env.PORT || environment.expressPort;

  // Setup Colyseus
  const gameSvc = app.get(GameService);
  gameSvc.createServer(app.getHttpServer());
  for (const room of ROOMS) {
    gameSvc.defineRoom(room.name, room);
  }

  await app.listen(port, () => {
    Logger.log(`GraphQL server running at http://localhost:${port}/graphql`);
    Logger.log(`Colyseus monitor running at http://localhost:${port}/monitor`);
  });
}

bootstrap();
