import { Module } from '@nestjs/common';
import { ParameterRepository } from '@shared/repositories/parameter.repository.js';
import { EmailController } from './controllers/email.controller.js';
import { EmailService } from './services/email.service.js';

@Module({
  controllers: [EmailController],
  providers: [EmailService, ParameterRepository],
})
export class EmailModule {}
