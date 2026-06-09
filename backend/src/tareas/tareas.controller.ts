import { Controller, Get, Post, Put, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { Tarea } from './entities/tarea.entity';
import { CreateTareaDto } from './dto/create-tarea.dto';
import { UpdateTareaDto } from './dto/update-tarea.dto';

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

    @Put(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTareaDto: UpdateTareaDto,
    ): Promise<Tarea> {
    return await this.tareasService.update(id, updateTareaDto);
    }
}