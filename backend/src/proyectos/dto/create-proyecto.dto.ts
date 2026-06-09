export class CreateProyectoDto {
    nombre: string;
    estado: 'ACTIVO' | 'FINALIZADO' | 'BAJA';
    id_cliente: number;
}