import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Proyecto, Cliente } from '../interfaces/api.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  proyectos: Proyecto[] = [];
  clientesActivos: Cliente[] = [];

  // Campos del formulario
  nuevoNombre: string = '';
  clienteSeleccionadoId: number | null = null;

  errorMensaje: string = '';
  exitoMensaje: string = '';

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarProyectos();
    this.cargarClientesActivos();
  }

  async cargarProyectos(): Promise<void> {
    try {
      this.proyectos = await this.apiService.get('proyectos');
    } catch (error) {
      this.errorMensaje = 'No se pudieron cargar los proyectos.';
    }
  }

  async cargarClientesActivos(): Promise<void> {
    try {
      const todosLosClientes: Cliente[] = await this.apiService.get('clientes');
      // Filtrar únicamente los clientes que estén en estado ACTIVO
      this.clientesActivos = todosLosClientes.filter(c => c.estado === 'ACTIVO');
    } catch (error) {
      console.error('Error al cargar clientes para el selector', error);
    }
  }


  async crearProyecto(): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    if (!this.nuevoNombre) {
      this.errorMensaje = 'El nombre del proyecto es obligatorio.';
      return;
    }

    try {
      await this.apiService.post('proyectos', {
        nombre: this.nuevoNombre,
        clienteId: this.clienteSeleccionadoId ? Number(this.clienteSeleccionadoId) : null
      });

      this.exitoMensaje = 'Proyecto creado con éxito.';
      this.nuevoNombre = '';
      this.clienteSeleccionadoId = null;
      this.cargarProyectos();
    } catch (error: any) {
      this.errorMensaje = error.response?.data?.message || 'Error al crear el proyecto.';
    }
  }

  async cambiarEstado(proyecto: Proyecto, nuevoEstado: 'ACTIVO' | 'FINALIZADO' | 'BAJA'): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    try {
      await this.apiService.put(`proyectos/${proyecto.id}`, {
        estado: nuevoEstado
      });

      this.exitoMensaje = `Proyecto actualizado a estado ${nuevoEstado}.`;
      this.cargarProyectos();
    } catch (error: any) {
      this.errorMensaje = error.response?.data?.message || 'No se pudo cambiar el estado del proyecto.';
    }
  }
}
