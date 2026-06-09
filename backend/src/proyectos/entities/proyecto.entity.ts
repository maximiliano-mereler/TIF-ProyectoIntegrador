import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Cliente } from '../../clientes/entities/cliente.entity';
import { Tarea } from '../../tareas/entities/tarea.entity';

@Entity({ name: 'proyectos' })
export class Proyecto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', unique: true, nullable: false })
    nombre: string;

    @Column({
    type: 'enum',
    enum: ['ACTIVO', 'FINALIZADO', 'BAJA'],
    nullable: false,
    })
    estado: string;

    @ManyToOne(() => Cliente, (cliente) => cliente.proyectos, { nullable: false })
    @JoinColumn({ name: 'id_cliente' })
    cliente: Cliente;

    @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
    tareas: Tarea[];
}