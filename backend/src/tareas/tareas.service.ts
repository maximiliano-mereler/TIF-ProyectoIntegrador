import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';

@Injectable()
export class TareasService {
    constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    ) {}

    async findAll(): Promise<Tarea[]> {  
    return await this.tareaRepository.find({
      relations: {
        proyecto: true,
      },
    });
    }
}