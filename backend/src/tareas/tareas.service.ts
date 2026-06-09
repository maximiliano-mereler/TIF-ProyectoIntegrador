import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { Proyecto } from '../proyectos/entities/proyecto.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
    
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
  ) {}

  async findAll(): Promise<Tarea[]> {
    return await this.tareaRepository.find({
      relations: {
        proyecto: true,
      },
    });
  }

  async create(createTareaDto: CreateTareaDto): Promise<Tarea> {
    // Verificar si el proyecto asociado realmente existe
    const proyecto = await this.proyectoRepository.findOne({
      where: { id: createTareaDto.id_proyecto },
    });

    if (!proyecto) {
      throw new NotFoundException(`El proyecto con ID ${createTareaDto.id_proyecto} no existe`);
    }

    const nuevaTarea = this.tareaRepository.create({
      descripcion: createTareaDto.descripcion,
      estado: createTareaDto.estado,
      proyecto: proyecto,
    });

    return await this.tareaRepository.save(nuevaTarea);
  }
}