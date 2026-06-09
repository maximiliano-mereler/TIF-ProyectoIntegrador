import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Usuario } from '../interfaces/api.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    
  // Campos del formulario para creación
    nuevoNombre: string = '';
    nuevaClave: string = '';
    
    errorMensaje: string = '';
    exitoMensaje: string = '';

    constructor(private readonly apiService: ApiService) {}

    ngOnInit(): void {
    this.cargarUsuarios();
    }

    async cargarUsuarios(): Promise<void> {
    try {
        this.usuarios = await this.apiService.get('usuarios');
    } catch (error) {
        this.errorMensaje = 'No se pudieron cargar los usuarios del servidor.';
    }
    }

    async crearUsuario(): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    if (!this.nuevoNombre || !this.nuevaClave) {
        this.errorMensaje = 'Todos los campos de alta son obligatorios.';
        return;
    }

    try {
        await this.apiService.post('usuarios', {
        nombre: this.nuevoNombre,
        clave: this.nuevaClave
        });
        
        this.exitoMensaje = 'Usuario registrado con éxito.';
        this.nuevoNombre = '';
        this.nuevaClave = '';
      this.cargarUsuarios(); // Recargar la tabla con el nuevo registro
    } catch (error: any) {
        this.errorMensaje = error.response?.data?.message || 'Error al intentar dar de alta el usuario.';
    }
    }

    async alternarEstado(usuario: Usuario): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';
    
    // Determinar el nuevo estado inverso
    const nuevoEstado = usuario.estado === 'ACTIVO' ? 'BAJA' : 'ACTIVO';

    try {
        await this.apiService.put(`usuarios/${usuario.id}`, {
        estado: nuevoEstado
        });
        
        this.exitoMensaje = `Estado de ${usuario.nombre} actualizado a ${nuevoEstado}.`;
      this.cargarUsuarios(); // Refrescar los cambios desde la base de datos
    } catch (error) {
        this.errorMensaje = 'No se pudo modificar el estado del usuario.';
    }
    }
}
