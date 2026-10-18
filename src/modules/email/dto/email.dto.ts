import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class SendEmailDto {
  @IsEmail({}, { message: 'Correo electrónico no válido.' })
  @IsNotEmpty({ message: 'Correo electrónico es requerido.' })
  to: string;

  @IsString({ message: 'Asunto debe ser texto' })
  @IsNotEmpty({ message: 'Asunto es requerido.' })
  subject: string;

  @IsObject({ message: 'Contenido no válido' })
  @IsNotEmpty({ message: 'Contenido es requerido.' })
  context: any;

  @IsString({ message: 'Plantilla debe ser texto' })
  @IsNotEmpty({ message: 'Plantilla de correo es requerido.' })
  templateName: string;
}
