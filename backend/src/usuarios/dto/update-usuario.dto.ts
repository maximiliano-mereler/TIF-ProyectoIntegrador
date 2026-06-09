export class UpdateUsuarioDto {
    nombre?: string;
    clave?: string;
    estado?: 'ACTIVO' | 'BAJA';
}