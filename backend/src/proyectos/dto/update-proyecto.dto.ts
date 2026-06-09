export class UpdateProyectoDto {
    nombre?: string;
    estado?: 'ACTIVO' | 'FINALIZADO' | 'BAJA';
    id_cliente?: number;
}