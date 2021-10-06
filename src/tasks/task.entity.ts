import { TaskStatus } from "./task-status.enum";
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "src/auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  status: TaskStatus;
  @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
  @Exclude({ toPlainOnly: true }) // decorateur du package class-transformer qui exclut user de l'affichage en json pour ne pas exposer les datas
  user: User;
}
