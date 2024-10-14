import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(Number(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(Number(id), updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(Number(id));
  }
}


// import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
// import { CreateCatDto, ListAllEntities, UpdateCatDto, } from './dto/create-cat.dto';
// import { CatsService } from './cats.service';



// //cats.controller.ts
// @Controller('cats')
// export class CatsController {
//   constructor(private readonly catsService: CatsService) {

//   }

//   @Post()
//   create(@Body() createCatDto: CreateCatDto) {
//     return this.catsService.create(createCatDto);
//   }

//   @Get()
//   findAll() {
//     return this.catsService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.catsService.findOne(Number(id));
//   }

//   @Put(':id')
//   update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
//     return this.catsService.update(Number(id), updateCatDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.catsService.remove(Number(id));
//   }

// }