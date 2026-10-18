import { HttpException, HttpStatus } from '@nestjs/common';
import fs from 'fs';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import { SendEmailI } from '@shared/interfaces/send-email.interface.js';

handlebars.registerHelper('eq', function (this: any, arg1: any, arg2: any) {
  return arg1 === arg2;
});

const readHTMLFile = (path: string) => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        reject(err);
      } else {
        resolve(html);
      }
    });
  });
};

const sendEmail = async (email: SendEmailI) => {
  const transporter = nodemailer.createTransport({
    service: email.service,
    port: email.port,
    secure: email.secure,
    tls: {
      rejectUnauthorized: email.secure,
    },
    auth: {
      user: email.user,
      pass: email.password,
    },
  });

  const rootPath: string = process.cwd();
  try {
    const html = await readHTMLFile(
      `${rootPath}/templates/${email.templateName}.hbs`,
    );
    const template = handlebars.compile(html);
    const htmlToSend = template(email.context);

    await transporter.sendMail({
      from: email.from,
      to: email.to,
      subject: email.subject,
      html: htmlToSend,
    });
  } catch (error) {
    throw new HttpException((error as any).message, HttpStatus.BAD_REQUEST);
  } finally {
    if (transporter) {
      transporter.close();
    }
  }
};

export { sendEmail };
