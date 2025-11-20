import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { ApiKeyGuard } from './login/guards/api-key.guard';
import { PORT } from './lib/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalGuards(new ApiKeyGuard());

  await app.listen(PORT);
}

bootstrap()
  .then(() => {})
  .catch(() => {});
