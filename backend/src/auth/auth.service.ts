import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async login(loginDto: LoginDto): Promise<{ mensaje: string; usuario: { id: number; nombre: string } }> {
    const { nombre, clave } = loginDto;

    // 1. Buscar al usuario por nombre
    const usuario = await this.usuarioRepository.findOne({ where: { nombre } });

    // 2. Validar existencia y estado activo
    if (!usuario || usuario.estado === 'BAJA') {
        throw new UnauthorizedException('Credenciales inválidas o usuario inactivo');
    }

    // 3. Comparar el hash de la clave
    const claveValida = await bcrypt.compare(clave, usuario.clave);
    if (!claveValida) {
        throw new UnauthorizedException('Credenciales inválidas');
    }

    // 4. Retornar éxito con los datos básicos del usuario
    return {
        mensaje: 'Inicio de sesión exitoso',
        usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        },
    };
    }
}