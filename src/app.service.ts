import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    return 'Hello World!';
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // handleCron() {
  //    this.logger.error('Called every 30 seconds');
  //    this.logger.debug('Called every 30 seconds');
  //    this.logger.log('Called every 30 seconds');
  //    this.logger.fatal('Called every 30 seconds');
  //    this.logger.warn('Called every 30 seconds');
  //    this.logger.verbose('Called every 30 seconds');
  // } 
}
