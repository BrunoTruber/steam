/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreateJogosDto } from './dto/create-jogos.dto';
import { UpdateJogoDto} from './dto/update-jogos.dto';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Jogos } from './jogo.entity';
import { User } from 'src/users/user.entity';



@Injectable()
export class JogosService {
  [x: string]: any;
  constructor(
  @InjectRepository(UpdateJogoDto)
  private readonly jogoRepository: Repository<Jogos>) {}

  async findMany() {
    return await this.jogoRepository.find()
 
  }

  async findOneJogo(id: number) {
    const jogo = await this.jogoRepository
      .findOne(id)
    if (!jogo)
      throw new NotFoundException('game does not exist or unauthorized');
    return jogo;

  }


  async postJogo(createJogosDto: CreateJogosDto) {
    const jogo = this.jogoRepository.create({ ...createJogosDto });
    return await this.jogoRepository.save(jogo);
  }
  
  async update(id: number, updateJogoDto: UpdateJogoDto) {
    const jogo = await this.getById(id);
    const jogoedit = Object.assign(jogo, updateJogoDto);
    return await this.jogoRepository.save(jogoedit);
  }

  async delete(id: number, user?: User) {
    const jogo = await this.getById(id, user);
    return await this.jogoRepository.remove(jogo);
  }

}