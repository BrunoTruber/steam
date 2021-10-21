/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/common/decorators/auth-user.decorator';
import { CreateJogosDto } from 'src/auth/jogos/dto/create-jogos.dto';
import { JogosService } from './jogos.service';
import { Jogos } from './jogo.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('jogos')
export class JogosController {
  constructor(private service: JogosService) {}

  @Get()
  @UsePipes(ValidationPipe)
  find() {
    return this.service.find();
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@AuthUser()@Param('id') id: number): Promise<Jogos> {
    return this.service.findOneJogo(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  post(@AuthUser()@Body() data: CreateJogosDto): Promise<Jogos> {
    return this.service.postJogo( data );
  }

  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  delete(@AuthUser()@Param('id') id: number): Promise<Jogos[]> {
    return this.service.delete(id);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(
    @AuthUser()
    @Body() updateJogo: CreateJogosDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Jogos>{
    return this.service.update(id,updateJogo);
  }
}