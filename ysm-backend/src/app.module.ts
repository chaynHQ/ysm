import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { configModuleOptions } from './config-module-options';
import { ProfileModule } from './profile/profile.module';
import { ResourcesModule } from './resources/resources.module';
import { ThemesModule } from './themes/themes.module';
import { PagesModule } from './pages/pages.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ResourcesModule,
    ThemesModule,
    ProfileModule,
    PagesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
