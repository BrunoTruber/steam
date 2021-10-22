/* eslint-disable prettier/prettier */
import {
    IsString,
    MinLength,
    MaxLength,
    Matches,
    IsNotEmpty,
  } from 'class-validator';
  
  export class ChangePasswordDto {
    @IsNotEmpty({ message: 'Informe uma senha' })
    @MinLength(6, { message: 'A senha deve ter no mínimo 6 carcateres' })
    @MaxLength(32, { message: 'A senha deve ter no máximo 32 carcateres' })
    @IsString({ message: 'Informe uma senha válida' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo',
    })
    password: string;
  
    @IsNotEmpty({ message: 'Informe a confirmação de senha' })
    @MinLength(6, {
      message: 'A confirmação de senha deve ter no mínimo 6 carcateres',
    })
    @MaxLength(32, {
      message: 'A confirmação de senha deve ter no máximo 32 carcateres',
    })
    @IsString({ message: 'Informe uma confirmação de senha válida' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um símbolo',
    })
    passwordConfirmation: string;
  }