import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './database.config';
import { Usuario, Cliente, Proyecto, Tarea } from './entities';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    TypeOrmModule.forFeature([Usuario, Cliente, Proyecto, Tarea]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
