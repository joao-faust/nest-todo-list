import {
  createParamDecorator,
  ExecutionContext,
  ParseIntPipe,
} from '@nestjs/common';
import { Request } from 'express';

const parseIntPipe = new ParseIntPipe();

export const EntityId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return await parseIntPipe.transform(request.params.id, {
      metatype: Number,
      type: 'param',
    });
  },
);
