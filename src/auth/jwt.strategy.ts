/* eslint-disable prettier/prettier */
import { ExtractJwt, Strategy} from 'passport-jwt';
import { PassportStrategy} from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/users/users.repository';
import { jwtConstants } from './jwt.constants';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    
    constructor( @InjectRepository(UserRepository)
         private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret,
        });
    }

    async validate(payload: { id: number }) {
        const { id } = payload;
    
        const user = await this.userRepository.findOne(id, {
          select: ['name', 'email', 'status', 'role'],
        });
    
        if (!user) {
          throw new UnauthorizedException('usuario nao encontrado');
        }
    
        return user;
      }
}