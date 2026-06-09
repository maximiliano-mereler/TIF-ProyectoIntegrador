export class CreateTareaDto {
    descripcion: string;
    estado: 'PENDIENTE' | 'FINALIZADA' | 'BAJA';
    id_proyecto: number;
}