/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsersDto} from 'src/users/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async findMany(): Promise<User[]> {
    return this.db.user.findMany();
  }

  async findUnique(id: number): Promise<User> {
    const user = await this.db.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async create(data: CreateUsersDto): Promise<User> {
    const existing = await this.db.user.findUnique({
      where: { username: data.username },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }

    const hashedPassword = await bcrypt.hash(data.senha, 10);

    const tweets = data.tweets.map((tweet) => ({
      id: tweet,
    }))

    const user = await this.db.user.create({
      data: {
        ...data,
        senha: hashedPassword,
        tweets: {
          connect: tweets,
        },
      },
      include: {
        tweets: true
      }
    });

    return user;
  }

  async updateOneUser(id: number, user: CreateUsersDto): Promise<User> {
    return await this.db.user.update({
      data: {
        ...user,
        id: undefined,
      },
      where: {
        id,
      }
    });
  }

  async deleteOneUser(id: number): Promise<User> {
    const delUser = await this.db.user.findUnique({
      where: { id },
      select: {
        id: true,
      },
    });

    if (!delUser) {
      throw new NotFoundException();
    }

    if (delUser.id !== id) {
      throw new UnauthorizedException();
    }

    return this.db.user.delete({
      where: { id },
    });
  }
}
