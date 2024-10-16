import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from '../cats.controller';
import { CatsService } from '../cats.service';
import { CreateCatDto, UpdateCatDto } from '../dto/create-cat.dto';
import { NotFoundException } from '@nestjs/common';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
    service = module.get<CatsService>(CatsService);
  });

  describe('create', () => {
    it('should call service.create and return a new cat', async () => {
      const catDto: CreateCatDto = { name: 'Whiskers', description: 'Friendly cat', actions: 'purring' };
      const createdCat = { id: 1, ...catDto };

      (service.create as jest.Mock).mockResolvedValue(createdCat);

      expect(await controller.create(catDto)).toEqual(createdCat);
      expect(service.create).toHaveBeenCalledWith(catDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const cats = [{ id: 1, name: 'Whiskers', description: 'Friendly cat', actions: 'purring' }];
      (service.findAll as jest.Mock).mockResolvedValue(cats);

      expect(await controller.findAll()).toEqual(cats);
    });
  });

  describe('findOne', () => {
    it('should return a single cat', async () => {
      const cat = { id: 1, name: 'Whiskers', description: 'Friendly cat', actions: 'purring' };
      (service.findOne as jest.Mock).mockResolvedValue(cat);

      expect(await controller.findOne('1')).toEqual(cat);
    });

    it('should throw NotFoundException if cat not found', async () => {
      (service.findOne as jest.Mock).mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a cat', async () => {
      const updateCatDto: UpdateCatDto = { name: 'New name' };
      const updatedCat = { id: 1, name: 'New name', description: 'Friendly cat', actions: 'purring' };

      (service.update as jest.Mock).mockResolvedValue(updatedCat);

      expect(await controller.update('1', updateCatDto)).toEqual(updatedCat);
      expect(service.update).toHaveBeenCalledWith(1, updateCatDto);
    });
  });

  describe('remove', () => {
    it('should remove a cat', async () => {
      (service.remove as jest.Mock).mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
    });
  });
});
