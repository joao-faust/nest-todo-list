import { Task } from 'src/tasks/tasks.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'char', length: 60 })
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
