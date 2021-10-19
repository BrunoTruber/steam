/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { UpdateJogoDto} from './dto/update-jogos.dto';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';



@Injectable()
export class JogosService {
  constructor(private  db: PrismaService,
  @InjectRepository(UpdateJogoDto)
  private readonly jogoRepository: Repository<Jogo>) {}

  async find(username?: string): Promise<Tweet[]> {
    if (username) {
      const user = await this.db.user.findUnique({
        where: { username },
      });

      if (!user) {
        throw new NotFoundException('a user with this username does not exist');
      }
    }

    
    const tweets = await this.db.tweet.findMany({
      where: {  },
      orderBy: { createdAt: 'desc' },
    });

    return tweets;
  }

  async findOneJogo(id: number): Promise<Jogo> {
    const jogo = await this.db.tweet.findUnique({ 
      where: { 
        id 
      }
    });

    if (!jogo) {
      throw new NotFoundException('no tweet found with this id');
    }

    return jogo;
  }


  async postJogo(req: Request, createJogosDto: CreateJogosDto) {
    return await this.jogoRepository.save({
      ...createJogosDto,
      users: req.user,
    });
  }
  // postTweet(tweet: CreateTweetDto): Promise<Tweet> {
  //   return this.tweetRepository.save(tweet)

    // const user = tweet.userId.map(((userId) => ({
    //   id: userId,
    // })))

    // return this.db.tweet.create({
    //   data: {
    //     text: tweet.text,
    //     createdAt: tweet.createdAt,
    //     updatedAt: tweet.updatedAt,
    //     userId: {
    //       connect: user
    //     }
    //   },
    //   include: {
    //     userId: true,
    //   }
    // });
  //}

  async update(id: number, jogo: CreateJogosDto): Promise<Jogo> {
    return await this.db.jogo.update({
      data: {
        ...jogo,
        id: undefined,
      },
      where: {
        id,
      },
    });
  
  }

  async delete( id: number): Promise<void> {
    const jogo = await this.db.jogo.findUnique({ where: { id } });

    if (!jogo) {
      throw new NotFoundException();
    }

    if (jogo.id !== id) {
      throw new ForbiddenException();
    }

    await this.db.jogo.delete({ where: { id } });

  }

}