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
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from 'src/common/decorators/auth-user.decorator';
import { CreateJogosDto } from 'src/auth/jogos/dto/create-jogos.dto';
import { JogosService } from './jogos.service';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('jogos')
export class JogosController {
  constructor(private service: JogosService) {}

  @Get()
  @UsePipes(ValidationPipe)
  find(@AuthUser()@Query('username') username?: string): Promise<Jogo[]> {
    return this.service.find(username);
  }

  @Get(':id')
  @UsePipes(ValidationPipe)
  findOne(@AuthUser()@Param('id') id: number): Promise<Jogo> {
    return this.service.findOneJogo(id);
  }

  @Post('/create')
  @UsePipes(ValidationPipe)
  post( @Req() req: Request,@AuthUser()@Body() data: CreateJogosDto): Promise<Jogo> {
    return this.service.postJogo(req, data );
  }

  @Delete('delete/:id')
  @UsePipes(ValidationPipe)
  delete(@AuthUser()@Param('id') id: number): Promise<void> {
    return this.service.delete(id);
  }

  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(
    @AuthUser()
    @Body() updateJogo: CreateJogosDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Jogo>{
    return this.service.update(id,updateJogo);
  }
}