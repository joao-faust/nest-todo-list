import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

import { User } from 'src/users/users.entity';
import { TaskStatus } from 'src/tasks/tasks.types';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ length: 40 })
  name: string;

  @Column({ length: 250 })
  description: string;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.PENDING })
  status: TaskStatus;

  @CreateDateColumn({ precision: 0 })
  createdAt: Date;

  @Column({ type: 'datetime' })
  finishAt: Date;

  @Column({ type: 'datetime', nullable: true })
  startedAt?: Date | null;

  @Column({ type: 'datetime', nullable: true })
  finishedAt?: Date | null;

  @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
  user: User;
}
