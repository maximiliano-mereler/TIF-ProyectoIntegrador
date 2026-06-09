import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Tarea, Proyecto } from '../interfaces/api.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  proyectoId!: number;
  proyecto?: Proyecto;
  tareas: Tarea[] = [];
  
  nuevaDescripcion: string = '';
  errorMensaje: string = '';
  exitoMensaje: string = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly apiService: ApiService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('proyectoId');

    if (idParam) {
      this.proyectoId = Number(idParam);
      this.errorMensaje = '';
      this.cargarDatosProyecto();
      this.cargarTareas();
    } else {
      this.errorMensaje = 'No se detectó un ID de proyecto válido en la URL.';
    }
  }

  async cargarDatosProyecto(): Promise<void> {
    try {
      const todosLosProyectos: Proyecto[] = await this.apiService.get('proyectos');
      this.proyecto = todosLosProyectos.find(p => Number(p.id) === this.proyectoId);
    } catch (error) {
      console.error('Error al obtener datos del proyecto', error);
    }
  }

  async cargarTareas(): Promise<void> {
    try {
      // Ajuste de ruta estándar según los controladores comunes de NestJS
      this.tareas = await this.apiService.get(`tareas?id_proyecto=${this.proyectoId}`);
    } catch (error) {
      try {
        // Segunda opción de respaldo si el backend maneja rutas parametrizadas nativas
        this.tareas = await this.apiService.get(`tareas/proyecto/${this.proyectoId}`);
      } catch (err) {
        this.errorMensaje = 'No se pudieron cargar las tareas de este proyecto.';
      }
    }
  }

  async crearTarea(): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    if (!this.nuevaDescripcion) {
      this.errorMensaje = 'La descripción de la tarea es obligatoria.';
      return;
    }

    const payload = {
      descripcion: this.nuevaDescripcion,
      id_proyecto: this.proyectoId,
      estado: 'PENDIENTE'
    };

    try {
      await this.apiService.post('tareas', payload);
      this.exitoMensaje = 'Tarea añadida correctamente.';
      this.nuevaDescripcion = '';
      this.cargarTareas();
    } catch (error: any) {
      this.errorMensaje = error.response?.data?.message || 'Error al crear la tarea.';
    }
  }

  async cambiarEstado(tarea: Tarea, nuevoEstado: 'PENDIENTE' | 'FINALIZADA' | 'BAJA'): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    try {
      await this.apiService.put(`tareas/${tarea.id}`, {
        estado: nuevoEstado
      });
      this.exitoMensaje = `Tarea actualizada a ${nuevoEstado}.`;
      this.cargarTareas();
    } catch (error: any) {
      this.errorMensaje = error.response?.data?.message || 'No se pudo modificar el estado de la tarea.';
    }
  }
}
