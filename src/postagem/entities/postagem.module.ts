import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Postagem } from './postagem.entity'; 
import { PostagemController } from '../controllers/postagem.controller';
import { PostagemService } from '../services/postagem.service'; 
import { TemaModule } from '../../tema/tema.module'; 

@Module({
  imports: [TypeOrmModule.forFeature([Postagem]), TemaModule],
  controllers: [PostagemController],
  providers: [PostagemService],
  exports: [],
})
export class PostagemModule {}
