import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ILike, Repository } from 'typeorm';
import { Tema } from '../entities/tema.entity';

@Injectable()
export class TemaService {
  constructor(
    @InjectRepository(Tema)
    private temaRepository: Repository<Tema>,
  ) {}

  async findAll(): Promise<Tema[]> {
    return this.temaRepository.find({
      relations: {
        postagens: true,
      },
    });
  }

  async findById(id: number): Promise<Tema> {
    const tema = await this.temaRepository.findOne({
      where: { id },
      relations: { postagens: true },
    });

    if (!tema) {
      throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);
    }

    return tema;
  }

  async findAllByDescricao(descricao: string): Promise<Tema[]> {
    return this.temaRepository.find({
      where: {
        descricao: ILike(`%${descricao}%`),
      },
      relations: {
        postagens: true,
      },
    });
  }

  async create(tema: Tema): Promise<Tema> {
    return this.temaRepository.save(tema);
  }

  async update(tema: Tema): Promise<Tema> {
    if (!tema.id) {
      throw new HttpException(
        'ID do tema é obrigatório para atualização',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.findById(tema.id); // Garante que o tema existe antes de atualizar

    return this.temaRepository.save(tema);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id); // Garante que o tema existe antes de excluir

    return this.temaRepository.delete(id);
  }
}
