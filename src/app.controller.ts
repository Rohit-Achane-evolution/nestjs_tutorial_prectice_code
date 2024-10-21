import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
    // this.CatsService.handleCron();

  }
  // @Get()
  // cornTask(): any {
  //   return this.appService.handleCron();
  //   // this.CatsService.handleCron();

  // }

}
