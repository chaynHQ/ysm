import { ConfigService } from '@nestjs/config';
import { when } from 'jest-when';

export function mockConfigService<T>(instance: ConfigService, key: string, value: T): void {
  const spy = jest.spyOn(instance, 'get');
  when(spy).expectCalledWith(key, undefined).mockReturnValue(value);
}
