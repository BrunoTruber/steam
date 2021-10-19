/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JogosController } from './jogos.controller';
import { JogosService } from './jogos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UpdateJogoDto} from './dto/update-jogos.dto';


@Module({
  imports: [TypeOrmModule.forFeature([UpdateJogoDto])],
  providers: [JogosService],
  controllers: [JogosController],
})
export class JogosModule {}