/* eslint-disable prettier/prettier */
import { IsString, Length } from 'class-validator';
import { User } from 'src/users/user.entity';

export class LoginDto {
  @IsString()
  @Length(3, 30)
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;
}

export class AuthResponse {
  token: string;
  user: User;
}