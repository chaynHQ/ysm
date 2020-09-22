import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CURRENT_USER_ID_FIELD } from '../constants';

export const CurrentUserId = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request[CURRENT_USER_ID_FIELD];
});
