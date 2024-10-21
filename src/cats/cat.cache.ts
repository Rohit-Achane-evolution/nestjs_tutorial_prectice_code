import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { Cache } from 'cache-manager';

@Injectable()
export class catCacheService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

    async findCatById(id: number) {
        const cacheKey = `cat_${id}`;

        // Check if data is already cached
        let cat = await this.cacheManager.get(cacheKey);
        if (cat) {
            console.log('Returning cached data');
            return cat;
        }
        else {
            cat = { id, name: 'Arch demon', age: 2 }; // Assume this is from the DB
            // Store the result in cache with a TTL of 10 seconds
            await this.cacheManager.set(cacheKey, cat, 50);
            console.log('Storing data in cache');

            return cat;
        }

    }



}