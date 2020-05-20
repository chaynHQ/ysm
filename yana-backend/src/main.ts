import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1);
  await app.listen(3000);
}
bootstrap();
