import { Controller, Get, Post, Body } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { Proyecto } from './entities/proyecto.entity';
import { CreateProyectoDto } from './dto/create-proyecto.dto';

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
}