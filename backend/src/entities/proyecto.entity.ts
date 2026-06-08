import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cliente } from './cliente.entity';
import { Tarea } from './tarea.entity';

export enum EstadoProyecto {
  ACTIVO = 'ACTIVO',
  FINALIZADO = 'FINALIZADO',
  BAJA = 'BAJA',
}

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  nombre: string;

  @Column({
    type: 'enum',
    enum: EstadoProyecto,
    default: EstadoProyecto.ACTIVO,
  })
  estado: EstadoProyecto;

  @ManyToOne(() => Cliente, (cliente) => cliente.proyectos, { nullable: true })
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => Tarea, (tarea) => tarea.proyecto)
  tareas: Tarea[];
}
