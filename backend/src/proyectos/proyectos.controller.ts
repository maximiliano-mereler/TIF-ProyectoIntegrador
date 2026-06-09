import { Controller, Get, Post, Body, Param, ParseIntPipe, Put  } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Controller('proyectos')
export class ProyectosController {
    constructor(private readonly proyectosService: ProyectosService) {}

    @Get()
    async findAll(): Promise<Proyecto[]> {
    return await this.proyectosService.findAll();
    }

    @Post()
    async create(@Body() createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    return await this.proyectosService.create(createProyectoDto);
    }

    @Put(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProyectoDto: UpdateProyectoDto,
    ): Promise<Proyecto> {
    return await this.proyectosService.update(id, updateProyectoDto);
    }
}