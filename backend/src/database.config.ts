import { DataSource } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Usuario, Cliente, Proyecto, Tarea } from './entities';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'tif_proyecto',
  entities: [Usuario, Cliente, Proyecto, Tarea],
  synchronize: false, // Cambiado a false para respetar el script init.sql de la cátedra
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
  synchronize: false, // Cambiado a false para evitar que TypeORM altere las tablas del script
  logging: process.env.NODE_ENV === 'development',
};