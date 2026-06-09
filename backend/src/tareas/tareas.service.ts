import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { Proyecto } from '../proyectos/entities/proyecto.entity';
import { UpdateTareaDto } from './dto/update-tarea.dto';

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

  async update(id: number, updateTareaDto: UpdateTareaDto): Promise<Tarea> {
    const tarea = await this.tareaRepository.findOne({ where: { id }, relations: { proyecto: true } });
    if (!tarea) {
      throw new NotFoundException(`La tarea con ID ${id} no existe`);
    }

    if (updateTareaDto.id_proyecto) {
      const proyecto = await this.proyectoRepository.findOne({ where: { id: updateTareaDto.id_proyecto } });
      if (!proyecto) {
        throw new NotFoundException(`El proyecto con ID ${updateTareaDto.id_proyecto} no existe`);
      }
      tarea.proyecto = proyecto;
    }

    if (updateTareaDto.descripcion) tarea.descripcion = updateTareaDto.descripcion;
    if (updateTareaDto.estado) tarea.estado = updateTareaDto.estado;

    return await this.tareaRepository.save(tarea);
  }

}