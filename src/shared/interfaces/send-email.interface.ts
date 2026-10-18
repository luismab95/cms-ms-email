export interface SendEmailI {
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
