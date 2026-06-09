import { Controller, Get, Post, Body } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';

@Controller('tareas')
export class TareasController {
    constructor(private readonly tareasService: TareasService) {}

    @Get()
    async findAll(): Promise<Tarea[]> {
    return await this.tareasService.findAll();
    }

    @Post()
    async create(@Body() createTareaDto: CreateTareaDto): Promise<Tarea> {
    return await this.tareasService.create(createTareaDto);
    }
}