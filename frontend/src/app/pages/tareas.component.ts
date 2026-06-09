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
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('proyectoId');

    // Imprime en la consola F12 del navegador para verificar el valor capturado
    console.log('ID del proyecto capturado desde la URL:', idParam);

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
      this.tareas = await this.apiService.get(`tareas?proyectoId=${this.proyectoId}`);
    } catch (error) {
      this.errorMensaje = 'No se pudieron cargar las tareas de este proyecto.';
    }
  }

    async crearTarea(): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    if (!this.nuevaDescripcion) {
      this.errorMensaje = 'La descripción de la tarea es obligatoria.';
      return;
    }

    // Objeto con todas las variantes de mapeo relacional para TypeORM
    const payload = {
      descripcion: this.nuevaDescripcion,
      proyectoId: this.proyectoId,
      proyecto: { id: this.proyectoId },
      Proyecto: { id: this.proyectoId },
      proyecto_id: this.proyectoId
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
