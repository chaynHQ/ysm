import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { configModuleOptions } from './config-module-options';
import { ResourcesModule } from './resources/resources.module';
import { StoryblokModule } from './storyblok/storyblok.module';
import { ThemesModule } from './themes/themes.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    StoryblokModule,
    ResourcesModule,
    ThemesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
