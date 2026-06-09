import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
    constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    ) {}

    async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find({
        relations: {
        proyectos: true,
        },
    });
    }

    async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const existe = await this.clienteRepository.findOne({
        where: { nombre: createClienteDto.nombre },
    });
    if (existe) {
        throw new ConflictException('El nombre del cliente ya se encuentra registrado');
    }
    const nuevoCliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(nuevoCliente);
    }

    async update(id: number, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    // 1. Buscar si el cliente existe
    const cliente = await this.clienteRepository.findOne({ where: { id } });
    if (!cliente) {
        throw new NotFoundException(`El cliente con ID ${id} no existe`);
    }

    // 2. Si se modifica el nombre, validar que no exista duplicado
    if (updateClienteDto.nombre && updateClienteDto.nombre !== cliente.nombre) {
        const nombreDuplicado = await this.clienteRepository.findOne({
        where: { nombre: updateClienteDto.nombre },
        });
        if (nombreDuplicado) {
        throw new ConflictException('El nuevo nombre de cliente ya está en uso');
        }
    }

    // 3. Fusionar los cambios y guardar
    const clienteModificado = this.clienteRepository.merge(cliente, updateClienteDto);
    return await this.clienteRepository.save(clienteModificado);
    }
}