import { Module } from '@nestjs/common';
import { Shutdown, MS_NAME } from 'cms-lib-database';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmailModule } from './modules/email/email.module.js';

@Module({
  imports: [EmailModule],
  controllers: [AppController],
  providers: [
    AppService,
    Shutdown,
    {
      provide: MS_NAME,
      useValue: 'MS-AUTH',
    },
  ],
})
export class AppModule {}
