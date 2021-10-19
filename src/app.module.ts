/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FollowModule } from './auth/follow/follow.module';
import { LikesModule } from './auth/likes/likes.module';
import { JogosModule } from './auth/jogos/jogos.module';
import {TypeOrmModule} from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(),UsersModule, AuthModule, FollowModule, LikesModule, JogosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
