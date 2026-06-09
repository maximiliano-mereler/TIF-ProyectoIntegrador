import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Controller('clientes')
export class ClientesController {
    constructor(private readonly clientesService: ClientesService) {}

    @Get()
    async findAll(): Promise<Cliente[]> {
    return await this.clientesService.findAll();
    }

    @Post()
    async create(@Body() createClienteDto: CreateClienteDto): Promise<Cliente> {
    return await this.clientesService.create(createClienteDto);
    }
}