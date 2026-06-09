import { Controller, Get } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { Tarea } from './entities/tarea.entity';

@Controller('tareas')
export class TareasController {
    constructor(private readonly tareasService: TareasService) {}

    @Get()
    async findAll(): Promise<Tarea[]> {
    return await this.tareasService.findAll();
    }
}