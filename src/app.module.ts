import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { CatsModule } from './cats/cats.module';
import { catCacheService } from './cats/cat.cache';
import { catCacheController } from './cats/cat.cache.controller';
import { ScheduleModule } from '@nestjs/schedule';
import { BullModule } from '@nestjs/bull';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [ScheduleModule.forRoot(), ConfigModule.forRoot(),
  CacheModule.register({
    isGlobal: true,
    ttl: 50, // Time to live (seconds) for cache entries, can be overridden
    max: 100, // Maximum number of items in the cache
  }),

  BullModule.forRoot({
    redis: {
      host: process.env.REDIS_HOST || 'localhost', // Use the environment variable
      port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    },
  }),
    FileUploadModule,
  ],
  controllers: [AppController, CatsController, catCacheController,],
  providers: [AppService, CatsService, PrismaService, catCacheService],
})
export class AppModule {

}
