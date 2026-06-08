import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario, EstadoUsuario } from '../entities';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private usuariosRepository: Repository<Usuario>,
  ) {}

  async create(nombre: string, clave: string): Promise<Usuario> {
    const usuario = this.usuariosRepository.create({
      nombre,
      clave,
      estado: EstadoUsuario.ACTIVO,
    });
    return this.usuariosRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { id } });
  }

  async findByNombre(nombre: string): Promise<Usuario | null> {
    return this.usuariosRepository.findOne({ where: { nombre } });
  }

  async update(id: number, nombre?: string, estado?: EstadoUsuario): Promise<Usuario | null> {
    await this.usuariosRepository.update(id, { nombre, estado });
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.usuariosRepository.delete(id);
  }
}
