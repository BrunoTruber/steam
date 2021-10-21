/* eslint-disable prettier/prettier */
import { IsDate, IsOptional, IsString, Length } from 'class-validator';
export class CreateUsersDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  @Length(8, 30)
  senha: string;

  @IsString()
  imagem: string;

  @IsString()
  bio: string;

  @IsDate()
  nascimento: string;

  @IsString()
  createdAt: Date;

  @IsString()
  updatedAt: Date;

  @IsOptional()
  jogos:number[];

  @IsOptional()
  follows: number[];

  @IsOptional()
  likes: number[]; 

}
