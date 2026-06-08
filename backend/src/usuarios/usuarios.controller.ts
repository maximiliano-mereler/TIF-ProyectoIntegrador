import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario, EstadoUsuario } from '../entities';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  @Post()
  async create(@Body() body: { nombre: string; clave: string }): Promise<Usuario> {
    return this.usuariosService.create(body.nombre, body.clave);
  }

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Usuario> {
    return this.usuariosService.findById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() body: { nombre?: string; estado?: EstadoUsuario },
  ): Promise<Usuario> {
    return this.usuariosService.update(id, body.nombre, body.estado);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.usuariosService.delete(id);
  }
}
