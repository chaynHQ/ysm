import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // see https://expressjs.com/en/guide/behind-proxies.html
  app.set('trust proxy', 1);

  app.useGlobalInterceptors(new LoggingInterceptor());

  const configService = app.get(ConfigService);

  await app.listen(configService.get('port'));
}
bootstrap();
