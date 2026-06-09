export class UpdateTareaDto {
    descripcion?: string;
    estado?: 'PENDIENTE' | 'FINALIZADA' | 'BAJA';
    id_proyecto?: number;
}