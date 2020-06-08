import { ConfigModuleOptions } from '@nestjs/config/dist/interfaces';

import config from './config';

const envFilePath = [];
switch (process.env.NODE_ENV) {
  case undefined:
  case 'development':
    envFilePath.push('.env.development.local');
    envFilePath.push('.env.development');
    break;

  case 'test':
    envFilePath.push('.env.test');
    break;
}

// Don't load any .env files on production - all config must be set in the running environment.
const ignoreEnvFile = process.env.NODE_ENV === 'production';

export const configModuleOptions: ConfigModuleOptions = {
  envFilePath,
  ignoreEnvFile,
  isGlobal: true,
  load: [config],
};
