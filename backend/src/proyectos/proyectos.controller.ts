import { Controller, Get } from '@nestjs/common';
import { ProyectosService } from './proyectos.service';
import { Proyecto } from './entities/proyecto.entity';

@Controller('proyectos')
export class ProyectosController {
    constructor(private readonly proyectosService: ProyectosService) {}

    @Get()
    async findAll(): Promise<Proyecto[]> {
    return await this.proyectosService.findAll();
    }
}