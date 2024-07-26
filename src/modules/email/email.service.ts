import { Injectable } from '@nestjs/common';
import { SendEmailDto } from './dto/email.dto';
import { EmailInterface, sendEmail } from 'src/shared/helpers/mail.helper';
import { OK_200 } from 'src/shared/constants/message.constants';
import { getParameter } from 'src/shared/helpers/parameter.helper';

@Injectable()
export class EmailService {
  async sendEmail(sendEmailDto: SendEmailDto) {
    const service = await getParameter('MAILER_HOST');
    const secure = await getParameter('MAILER_SECURE');
    const from = await getParameter('MAILER_FROM');
    const port = Number(await getParameter('MAILER_PORT'));
    const password = await getParameter('MAILER_PASSWORD');
    const user = await getParameter('MAILER_USER');
    const emailParameters = {
      service,
      from,
      port,
      password,
      user,
      secure: secure === 'true',
      ...sendEmailDto,
    } as EmailInterface;
    await sendEmail(emailParameters);
    return OK_200;
  }
}
