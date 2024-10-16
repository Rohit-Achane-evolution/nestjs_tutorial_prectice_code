import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';


//prisma.service.ts
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  async onModuleInit() {
    try {
      
      await this.$connect();
      console.log('PrismaService: Connected to the database.');
    } catch (error) {
      throw new Error('Failed to connect to the database');
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
