import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuario.entity';
import { Cliente } from './clientes/entities/cliente.entity';
import { Proyecto } from './proyectos/entities/proyecto.entity';
import { Tarea } from './tareas/entities/tarea.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tif_proyecto',
  entities: [Usuario, Cliente, Proyecto, Tarea],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
});

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tif_proyecto',
  entities: [Usuario, Cliente, Proyecto, Tarea],
  synchronize: false,
  logging: process.env.NODE_ENV === 'development',
};