import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { configModuleOptions } from './config-module-options';
import { PagesModule } from './pages/pages.module';
import { ProfileModule } from './profile/profile.module';
import { ResourcesModule } from './resources/resources.module';
import { ThemesModule } from './themes/themes.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleOptions),
    ResourcesModule,
    ThemesModule,
    ProfileModule,
    PagesModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
