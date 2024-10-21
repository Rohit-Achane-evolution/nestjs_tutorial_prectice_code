import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { any, z } from 'zod';
import { catCacheService } from './cats/cat.cache';
import { Cache } from 'cache-manager';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000);

}
bootstrap();
