/* eslint-disable prettier/prettier */
import { User } from '../user.entity';

export class ReturnUserDto {
    user: User;
    message: string;
}