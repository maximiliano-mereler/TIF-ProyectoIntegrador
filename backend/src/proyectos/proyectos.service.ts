import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { Cliente } from '../clientes/entities/cliente.entity';

@Injectable()
export class ProyectosService {
    constructor(
    @InjectRepository(Proyecto)
    private readonly proyectoRepository: Repository<Proyecto>,
    
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    ) {}

    async findAll(): Promise<Proyecto[]> {
    return await this.proyectoRepository.find({
        relations: {
        cliente: true,
        tareas: true,
        },
    });
    }

    async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    // 1. Verificar duplicado de nombre del proyecto
    const proyectoExiste = await this.proyectoRepository.findOne({
        where: { nombre: createProyectoDto.nombre },
    });
    if (proyectoExiste) {
        throw new ConflictException('El nombre del proyecto ya está registrado');
    }

    // 2. Verificar existencia del cliente asociado
    const cliente = await this.clienteRepository.findOne({
        where: { id: createProyectoDto.id_cliente },
    });
    if (!cliente) {
        throw new NotFoundException(`El cliente con ID ${createProyectoDto.id_cliente} no existe`);
    }

    // 3. Crear el registro vinculando la entidad cliente completa
    const nuevoProyecto = this.proyectoRepository.create({
        nombre: createProyectoDto.nombre,
        estado: createProyectoDto.estado,
        cliente: cliente,
    });

    return await this.proyectoRepository.save(nuevoProyecto);
    }
}