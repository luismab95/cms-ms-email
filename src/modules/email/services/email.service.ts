import { Injectable } from '@nestjs/common';
import { getParameter, OK_200 } from 'cms-lib-resources';
import { sendEmail } from '@shared/helpers/nodemailer.helper.js';
import { SendEmailI } from '@shared/interfaces/send-email.interface.js';
import { ParameterRepository } from '@shared/repositories/parameter.repository.js';
import { SendEmailDto } from '../dto/email.dto.js';

@Injectable()
export class EmailService {
  constructor(private readonly parameterRepository: ParameterRepository) {}

  async sendEmail(sendEmailDto: SendEmailDto) {
    const parameters = await this.parameterRepository.getParameters();

    const service = await getParameter(
      parameters.find((p) => p.code === 'MAILER_HOST'),
      'MAILER_HOST',
    );
    const secure = await getParameter(
      parameters.find((p) => p.code === 'MAILER_SECURE'),
      'MAILER_SECURE',
    );
    const from = await getParameter(
      parameters.find((p) => p.code === 'MAILER_FROM'),
      'MAILER_FROM',
    );
    const port = Number(
      await getParameter(
        parameters.find((p) => p.code === 'MAILER_PORT'),
        'MAILER_PORT',
      ),
    );
    const password = await getParameter(
      parameters.find((p) => p.code === 'MAILER_PASSWORD'),
      'MAILER_PASSWORD',
    );
    const user = await getParameter(
      parameters.find((p) => p.code === 'MAILER_USER'),
      'MAILER_USER',
    );
    const emailParameters = {
      service,
      from,
      port,
      password,
      user,
      secure: secure === 'true',
      ...sendEmailDto,
    } as SendEmailI;
    await sendEmail(emailParameters);
    return OK_200;
  }
}
