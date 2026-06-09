import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity({ name: 'clientes' })
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true, nullable: false })
    nombre: string;

    @Column({
    type: 'enum',
    enum: ['ACTIVO', 'BAJA'],
    nullable: false,
    })
    estado: string;

    @OneToMany(() => Proyecto, (proyecto) => proyecto.cliente)
    proyectos: Proyecto[];
}