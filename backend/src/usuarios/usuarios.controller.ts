import { Controller, Get } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    @Get()
    async findAll(): Promise<Usuario[]> {
    return await this.usuariosService.findAll();
    }
}