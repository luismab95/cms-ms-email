import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';
import * as fs from 'fs';
import { HttpException, HttpStatus } from '@nestjs/common';

export interface EmailInterface {
  to: string;
  from: string;
  subject: string;
  templateName: string;
  context: any;
  secure: boolean;
  user: string;
  password: string;
  port: number;
  service: string;
}

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

const sendEmail = async (email: EmailInterface) => {
  const transporter = nodemailer.createTransport({
    service: email.service,
    port: email.port,
    secure: email.secure,
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
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  } finally {
    if (transporter) {
      transporter.close();
    }
  }
};

export { sendEmail };
