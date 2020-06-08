import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { configModuleOptions } from './config-module-options';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [ConfigModule.forRoot(configModuleOptions), ResourcesModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
