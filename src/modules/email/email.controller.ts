import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { SendEmailDto } from './dto/email.dto';
import { ServiceResponseInterface } from 'src/shared/interfaces/response.interface';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';

@Controller('email')
@UseGuards(JwtGuard)
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async sendEmail(
    @Body() sendEmailDto: SendEmailDto,
  ): Promise<ServiceResponseInterface<string>> {
    return {
      message: await this.emailService.sendEmail(sendEmailDto),
      statusCode: HttpStatus.OK,
    };
  }
}
