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
//import AuthUser from 'src/common/decorators/auth-user.decorator';
import { CreateJogosDto } from 'src/auth/jogos/dto/create-jogos.dto';
import { JogosService } from './jogos.service';
import { Jogos } from './jogo.entity';
import { RolesGuard } from '../roles.guard';
import { UserRole } from 'src/users/user-roles.enum';
import { Role } from '../role.decorator';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('jogos')
export class JogosController {
  constructor(private service: JogosService) {}

  @Get()
  @Role(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  find() {
    return this.service.find();
  }

  @Get(':id')
  @Role(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  findOne(@Param('id') id: number): Promise<Jogos> {
    return this.service.findOneJogo(id);
  }

  @Post('/create')
  @Role(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  post(@Body() data: CreateJogosDto): Promise<Jogos> {
    return this.service.postJogo( data );
  }

  @Delete('delete/:id')
  @Role(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  delete(@Param('id') id: number): Promise<Jogos[]> {
    return this.service.delete(id);
  }

  @Put('/update/:id')
  @Role(UserRole.ADMIN)
  @UsePipes(ValidationPipe)
  async update(
    @Body() updateJogo: CreateJogosDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Jogos>{
    return this.service.update(id,updateJogo);
  }
}