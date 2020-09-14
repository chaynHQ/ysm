import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PREVIEW_MODE_FIELD } from '../constants';

export const PreviewMode = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return !!request[PREVIEW_MODE_FIELD];
});
