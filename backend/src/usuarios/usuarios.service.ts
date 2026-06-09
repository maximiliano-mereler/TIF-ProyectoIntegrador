import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
@Injectable()
export class UsuariosService {
    constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    ) {}

    async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
    }

    async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    // 1. Verificar si el usuario ya existe
    const usuarioExiste = await this.usuarioRepository.findOne({
        where: { nombre: createUsuarioDto.nombre },
    });
    if (usuarioExiste) {
        throw new ConflictException('El nombre de usuario ya está registrado');
    }

    // 2. Encriptar la contraseña con un factor de costo de 10 rounds
    const salt = await bcrypt.genSalt(10);
    const hashClave = await bcrypt.hash(createUsuarioDto.clave, salt);

    // 3. Crear y guardar el registro con la clave hasheada
    const nuevoUsuario = this.usuarioRepository.create({
        nombre: createUsuarioDto.nombre,
        clave: hashClave,
        estado: 'ACTIVO',
    });

    return await this.usuarioRepository.save(nuevoUsuario);
    }

    async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
        throw new NotFoundException(`El usuario con ID ${id} no existe`);
    }

    if (updateUsuarioDto.nombre && updateUsuarioDto.nombre !== usuario.nombre) {
        const usuarioExiste = await this.usuarioRepository.findOne({ where: { nombre: updateUsuarioDto.nombre } });
        if (usuarioExiste) {
        throw new ConflictException('El nombre de usuario ya está registrado');
        }
        usuario.nombre = updateUsuarioDto.nombre;
    }

    if (updateUsuarioDto.clave) {
        const salt = await bcrypt.genSalt(10);
        usuario.clave = await bcrypt.hash(updateUsuarioDto.clave, salt);
    }

    if (updateUsuarioDto.estado) {
        usuario.estado = updateUsuarioDto.estado;
    }

    return await this.usuarioRepository.save(usuario);
    }
}