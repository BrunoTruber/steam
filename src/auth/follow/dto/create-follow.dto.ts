/* eslint-disable prettier/prettier */
import { IsOptional } from 'class-validator';
import { Jogos } from 'src/auth/jogos/jogo.entity';
import { User } from 'src/users/user.entity';

export class CreateFollowDto {
    @IsOptional()
    user: User;

    jogos: Jogos;

    @IsOptional()
    followedId: number;
}