import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

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
    // Verificar si ya existe un cliente con el mismo nombre para evitar el error de base de datos
    const existe = await this.clienteRepository.findOne({
        where: { nombre: createClienteDto.nombre },
    });
    
    if (existe) {
        throw new ConflictException('El nombre del cliente ya se encuentra registrado');
    }

    const nuevoCliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(nuevoCliente);
    }
}