export interface Usuario {
    id: number;
    nombre: string;
    estado: 'ACTIVO' | 'BAJA';
}

export interface Cliente {
    id: number;
    nombre: string;
    estado: 'ACTIVO' | 'BAJA';
    proyectos?: Proyecto[];
}

export interface Proyecto {
    id: number;
    nombre: string;
    estado: 'ACTIVO' | 'FINALIZADO' | 'BAJA';
    id_cliente: number;
    cliente?: Cliente;
    tareas?: Tarea[];
}

export interface Tarea {
    id: number;
    descripcion: string;
    estado: 'PENDIENTE' | 'FINALIZADA' | 'BAJA';
    id_proyecto: number;
    proyecto?: Proyecto;
}

export interface AuthResponse {
    mensaje: string;
    usuario: {
    id: number;
    nombre: string;
    };
}