import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarea } from './entities/tarea.entity';
import { Proyecto } from '../proyectos/entities/proyecto.entity'; 
import { TareasController } from './tareas.controller';
import { TareasService } from './tareas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Tarea, Proyecto])],
    controllers: [TareasController],
    providers: [TareasService],
})
export class TareasModule {}
