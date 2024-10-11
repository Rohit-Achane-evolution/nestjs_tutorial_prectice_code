import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';

//cats.services.ts
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [  { id: 1, name: 'Whiskers', description: 2, actions: 'Siamese' },
    { id: 2, name: 'Tom', description: 3, actions: 'Persian' },
    { id: 3, name: 'Garfield', description: 5, actions: 'Tabby' },
    { id: 4, name: 'Bella', description: 1, actions: 'Maine Coon' },
    { id: 5, name: 'Kitty', description: 4, actions: 'British Shorthair' },
    { id: 6, name: 'Luna', description: 2, actions: 'Ragdoll' },
    { id: 7, name: 'Oliver', description: 3, actions: 'Sphynx' },
    { id: 8, name: 'Leo', description: 6, actions: 'Bengal' },
    { id: 9, name: 'Chloe', description: 2, actions: 'Scottish Fold' },
    { id: 10, name: 'Daisy', description: 1, actions: 'Norwegian Forest' },];

  create(createCatDto: CreateCatDto) {
    const newCat: Cat = {
      id: this.cats.length + 1, 
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    const cat = this.cats.find(cat => cat.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  update(id: number, updateCatDto: UpdateCatDto): Cat {
    const catId = this.cats.findIndex(cat => cat.id === id);
    if (catId === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    const updatedCat = {
      ...this.cats[catId],
      ...updateCatDto,
    };
    this.cats[catId] = updatedCat;
    return updatedCat;
  }

  remove(id: number): void {
    const catId = this.cats.findIndex(cat => cat.id === id);
    if (catId === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.cats.splice(catId, 1);
  }
}