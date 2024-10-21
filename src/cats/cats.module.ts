import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { PrismaService } from '../../prisma/prisma.service';
import { catCacheService } from './cat.cache';
import { catCacheController } from './cat.cache.controller';
import { CacheModule } from '@nestjs/cache-manager';

//cats.module.ts
@Module({

    imports: [
    CacheModule.register({
        ttl: 50, // Time to live (seconds) for cache entries, can be overridden
        max: 100, // Maximum number of items in the cache
    }),
        
    ],
    controllers: [CatsController, catCacheController],
    providers: [CatsService, PrismaService, catCacheService],
})
export class CatsModule { }