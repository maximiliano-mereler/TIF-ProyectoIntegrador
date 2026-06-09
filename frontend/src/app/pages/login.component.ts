import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    nombre: string = '';
    clave: string = '';
    errorMensaje: string = '';

    constructor(
    private readonly apiService: ApiService,
    private readonly router: Router
    ) {}

    async onSubmit(): Promise<void> {
    this.errorMensaje = '';
    
    if (!this.nombre || !this.clave) {
        this.errorMensaje = 'Por favor, complete todos los campos.';
        return;
    }

    try {
        const respuesta = await this.apiService.post('auth/login', {
        nombre: this.nombre,
        clave: this.clave
        });

      // Guardar el nombre del usuario en el almacenamiento local para persistir la sesión
        localStorage.setItem('usuario_nombre', respuesta.usuario.nombre);
        localStorage.setItem('usuario_id', respuesta.usuario.id.toString());

      // Redireccionar al Dashboard principal una vez autenticado
        this.router.navigate(['/dashboard']);
    } catch (error: any) {
        if (error.response && error.response.status === 401) {
        this.errorMensaje = 'Usuario o contraseña incorrectos.';
        } else {
        this.errorMensaje = 'Error de conexión con el servidor.';
        }
    }
    }
}