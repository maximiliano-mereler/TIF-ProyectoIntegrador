import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
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

    async update(id: number, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto> {
    const proyecto = await this.proyectoRepository.findOne({ where: { id }, relations: { cliente: true } });
    if (!proyecto) {
        throw new NotFoundException(`El proyecto con ID ${id} no existe`);
    }

    if (updateProyectoDto.nombre && updateProyectoDto.nombre !== proyecto.nombre) {
        const nombreDuplicado = await this.proyectoRepository.findOne({ where: { nombre: updateProyectoDto.nombre } });
        if (nombreDuplicado) {
        throw new ConflictException('El nuevo nombre de proyecto ya está en uso');
        }
    }

    if (updateProyectoDto.id_cliente) {
        const cliente = await this.clienteRepository.findOne({ where: { id: updateProyectoDto.id_cliente } });
        if (!cliente) {
        throw new NotFoundException(`El cliente con ID ${updateProyectoDto.id_cliente} no existe`);
        }
        proyecto.cliente = cliente;
    }

    if (updateProyectoDto.nombre) proyecto.nombre = updateProyectoDto.nombre;
    if (updateProyectoDto.estado) proyecto.estado = updateProyectoDto.estado;

    return await this.proyectoRepository.save(proyecto);
    }
}