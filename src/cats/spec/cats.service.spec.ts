import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from '../cats.service';
import { PrismaService } from '../../../prisma/prisma.service';
import {
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Cat } from '@prisma/client'; // Import the Cat type if needed

// Define a mock type for PrismaService
type MockPrismaService = {
  cat: {
    create: jest.Mock<Promise<Cat>, [any]>;
    findMany: jest.Mock<Promise<Cat[]>, []>;
    findUnique: jest.Mock<Promise<Cat | null>, [any]>;
    update: jest.Mock<Promise<Cat>, [any]>;
    delete: jest.Mock<Promise<void>, [any]>;
  };
};

// Create a mock implementation
const mockPrismaService: MockPrismaService = {
  cat: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
};

describe('CatsService', () => {
  let service: CatsService;
  let prisma: MockPrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: PrismaService,
          useValue: mockPrismaService, // Use the mock service
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
    prisma = module.get<PrismaService>(PrismaService) as unknown as MockPrismaService; // Assert the type
  });

  describe('create', () => {
    it('should create a new cat', async () => {
      const catDto = { name: 'Whiskers', description: 'Friendly cat', actions: 'purring' };
      const createdCat: Cat = { id: 1, ...catDto }; // Simulate a created cat

      prisma.cat.create.mockResolvedValue(createdCat); // Mock the create method

      expect(await service.create(catDto)).toEqual(createdCat);
    });

    it('should throw BadRequestException if cat already exists', async () => {
      prisma.cat.create.mockRejectedValue({ code: 'P2002' });

      await expect(service.create({ name: 'Whiskers', description: 'Friendly', actions: 'purring' }))
        .rejects
        .toThrow(BadRequestException);
    });

    it('should throw InternalServerErrorException for unknown errors', async () => {
      prisma.cat.create.mockRejectedValue(new Error());

      await expect(service.create({ name: 'Whiskers', description: 'Friendly', actions: 'purring' }))
        .rejects
        .toThrow(InternalServerErrorException);
    });
  });

  // Similar tests for findAll, findOne, update, and remove
});
