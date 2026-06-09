export class CreateUsuarioDto {
    nombre: string;
    clave: string;
    estado: 'ACTIVO' | 'BAJA';
}