import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';

@Injectable()
export class ProyectosService {
    constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    ) {}

    async findAll(): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({
        relations: {
        cliente: true,
        tareas: true,
        },
    });
    }
}