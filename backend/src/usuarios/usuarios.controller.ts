import { Controller, Get, Post, Put, Param, Body, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    async findAll(): Promise<Usuario[]> {
    return await this.usuariosService.findAll();
    }

    @Post()
    async create(@Body() createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuariosService.create(createUsuarioDto);
    }

    @Put(':id')
    async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    ): Promise<Usuario> {
    return await this.usuariosService.update(id, updateUsuarioDto);
    }
}