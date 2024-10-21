import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { catCacheService } from './cat.cache';

@Controller('catCache')


export class catCacheController {
    constructor(private readonly catsCache: catCacheService) { }

    @Get()
    async callCacheF() {

        console.log(await this.catsCache.findCatById(2));  // First call: should store in cache
        console.log(await this.catsCache.findCatById(1));  // First call: should store in cache
    }
}
