/* eslint-disable prettier/prettier */
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Informe um endereço de email' })
  @IsEmail({}, { message: 'Informe um endereço de email válido' })
  @MaxLength(200, {
    message: 'O endereço de email de ter menos de 200 carcateres',
  })
  email: string;

  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  @MaxLength(200, {
    message: 'O nome deve ter menos de 200 carcateres',
  })
  name: string;

  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 carcateres' })
  password: string;

  @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  @MinLength(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 carcateres',
  })
  passwordConfirmation: string;
}