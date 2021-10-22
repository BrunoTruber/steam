/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { User } from 'src/users/user.entity';
import { Jogos } from 'src/auth/jogos/jogo.entity';

export class CreateJogosDto implements Jogos {
  //id?: string;
  user: User;
  @IsString()
  nome: string;

  @IsString()
  imagem: string;

  @IsString()
  bio: string;

  @IsString()
  data_lancamento: Date;

}