import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proyecto } from './entities/proyecto.entity';
import { Cliente } from '../clientes/entities/cliente.entity'; // Importación añadida
import { ProyectosController } from './proyectos.controller';
import { ProyectosService } from './proyectos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto, Cliente])], // Se agrega Cliente aquí
    controllers: [ProyectosController],
    providers: [ProyectosService],
})
export class ProyectosModule {}