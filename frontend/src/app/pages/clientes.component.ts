import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Cliente } from '../interfaces/api.interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  nuevoNombre: string = '';
  errorMensaje: string = '';
  exitoMensaje: string = '';

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.cargarClientes();
  }

  async cargarClientes(): Promise<void> {
    try {
      this.clientes = await this.apiService.get('clientes');
    } catch (error) {
      this.errorMensaje = 'No se pudieron cargar los clientes del servidor.';
    }
  }

  async crearCliente(): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';

    if (!this.nuevoNombre) {
      this.errorMensaje = 'El nombre del cliente es obligatorio.';
      return;
    }

    try {
      await this.apiService.post('clientes', {
        nombre: this.nuevoNombre
      });
      
      this.exitoMensaje = 'Cliente registrado con éxito.';
      this.nuevoNombre = '';
      this.cargarClientes();
    } catch (error: any) {
      this.errorMensaje = error.response?.data?.message || 'Error al intentar dar de alta el cliente.';
    }
  }

  async alternarEstado(cliente: Cliente): Promise<void> {
    this.errorMensaje = '';
    this.exitoMensaje = '';
    
    const nuevoEstado = cliente.estado === 'ACTIVO' ? 'BAJA' : 'ACTIVO';

    try {
      await this.apiService.put(`clientes/${cliente.id}`, {
        estado: nuevoEstado
      });
      
      this.exitoMensaje = `Estado de ${cliente.nombre} actualizado a ${nuevoEstado}.`;
      this.cargarClientes();
    } catch (error: any) {
      this.errorMensaje = error.response?.data?.message || 'No se pudo modificar el estado del cliente.';
    }
  }
}
