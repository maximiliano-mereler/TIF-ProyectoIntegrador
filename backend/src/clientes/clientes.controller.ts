import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

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

    @Put(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClienteDto: UpdateClienteDto,
    ): Promise<Cliente> {
    return await this.clientesService.update(id, updateClienteDto);
    }
}