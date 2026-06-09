import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'usuarios' })
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true, nullable: false })
    nombre: string;

    @Column({ type: 'text', nullable: false })
    clave: string;

    @Column({
    type: 'enum',
    enum: ['ACTIVO', 'BAJA'],
    nullable: false,
    })
    estado: string;
}