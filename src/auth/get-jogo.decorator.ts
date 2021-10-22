/* eslint-disable prettier/prettier */
import { createParamDecorator } from '@nestjs/common';
import { Jogos } from 'src/auth/jogos/jogo.entity';

export const GetJogo = createParamDecorator((data, req): Jogos => {
  const jogo = req.args[0].jogo;
  return jogo;
});