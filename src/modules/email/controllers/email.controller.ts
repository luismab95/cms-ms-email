import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard, ServiceResponseI } from 'cms-lib-resources';
import { EmailService } from '../services/email.service.js';
import { SendEmailDto } from '../dto/email.dto.js';

@Controller('email')
@UseGuards(JwtGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async sendEmail(
    @Body() sendEmailDto: SendEmailDto,
  ): Promise<ServiceResponseI<string>> {
    return {
      message: await this.emailService.sendEmail(sendEmailDto),
      statusCode: HttpStatus.OK,
    };
  }
}
