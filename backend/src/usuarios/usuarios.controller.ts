import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

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
}