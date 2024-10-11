import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [  { id: 1, name: 'Whiskers', age: 2, breed: 'Siamese' },
    { id: 2, name: 'Tom', age: 3, breed: 'Persian' },
    { id: 3, name: 'Garfield', age: 5, breed: 'Tabby' },
    { id: 4, name: 'Bella', age: 1, breed: 'Maine Coon' },
    { id: 5, name: 'Kitty', age: 4, breed: 'British Shorthair' },
    { id: 6, name: 'Luna', age: 2, breed: 'Ragdoll' },
    { id: 7, name: 'Oliver', age: 3, breed: 'Sphynx' },
    { id: 8, name: 'Leo', age: 6, breed: 'Bengal' },
    { id: 9, name: 'Chloe', age: 2, breed: 'Scottish Fold' },
    { id: 10, name: 'Daisy', age: 1, breed: 'Norwegian Forest' },];

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