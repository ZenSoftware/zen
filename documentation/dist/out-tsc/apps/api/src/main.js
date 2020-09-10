import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
async function bootstrap() {
    const port = process.env.PORT || environment.expressPort;
    const app = await NestFactory.create(AppModule, {
        cors: environment.production ? undefined : { credentials: true, origin: true },
    });
    await app.listen(port, () => {
        Logger.log(`Listening at http://localhost:${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map