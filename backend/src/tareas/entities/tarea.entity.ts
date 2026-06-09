import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proyecto } from '../../proyectos/entities/proyecto.entity';

@Entity({ name: 'tareas' })
export class Tarea {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    descripcion: string;

    @Column({
    type: 'enum',
    enum: ['PENDIENTE', 'FINALIZADA', 'BAJA'],
    nullable: false,
    })
    estado: string;

    @ManyToOne(() => Proyecto, (proyecto) => proyecto.tareas, { nullable: false })
    @JoinColumn({ name: 'id_proyecto' })
    proyecto: Proyecto;
}