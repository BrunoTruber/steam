/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post, Put, Param, UseGuards, UsePipes, ValidationPipe, Delete, ParseIntPipe} from '@nestjs/common';
import { User } from '.prisma/client';
import { CreateUsersDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import AuthUser from '../common/decorators/auth-user.decorator';
import { Role } from '../auth/role.decorator'
import { UserRole } from './user-roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';

@UseGuards(AuthGuard(), RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}
  
  @Role(UserRole.ADMIN)
  @Post('/create')
  create(@Body() data: CreateUsersDto): Promise<User> {
    return this.service.create(data);
  }

  @Role(UserRole.ADMIN)
  @Get()
  findMany(): Promise<User[]> {
    return this.service.findMany()
  }

  @Role(UserRole.ADMIN)
  @Get(':id')
  findUnique(@AuthUser()@Param('id') id: number): Promise<User> {
    return this.service.findUnique(id);
  }

  @Role(UserRole.ADMIN)
  @Delete('/delete/:id')
  @UsePipes(ValidationPipe)
  async delete(@AuthUser()@Param('id') id: number) {
    return this.service.deleteOneUser(id);
  }

  @Role(UserRole.ADMIN)
  @Put('/update/:id')
  @UsePipes(ValidationPipe)
  async update(@AuthUser()@Body() updateUser: CreateUsersDto, @Param('id', ParseIntPipe) id: number,): Promise<User> {
    return this.service.updateOneUser( id, updateUser );
  }
}
