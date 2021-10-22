/* eslint-disable prettier/prettier */
import { IsOptional, IsString } from 'class-validator';
import { User } from 'src/users/user.entity';

export class CreateFollowDto {
    @IsString()
    id: string;

    @IsOptional()
    user: User;

    @IsOptional()
    followedId: number;
}