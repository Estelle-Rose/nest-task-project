import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";
import { User } from "src/auth/user.entity";
import { InternalServerErrorException, Logger } from "@nestjs/common";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  private logger = new Logger("TasksRepository");
  // create task
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });
    try {
      await this.save(task);
      return task;
    } catch (error) {
      throw new InternalServerErrorException(); // so the error stays in the backend
    }
  }
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const query = this.createQueryBuilder("task"); // we create a query & "task" refers to the Task entity
    query.where({ user });
    const { status, search } = filterDto;

    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere(
        // lower permet de gérer la sensibilité à la casse
        "(LOWER(task.title)  LIKE LOWER(:search) OR LOWER(task.description) LIKE :search)",
        { search: `%${search}%` }
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (error) {
      this.logger.error(
        `Failed to get tasks for user "${
          user.username
        }. Filters: ${JSON.stringify(filterDto)}`,
        error.stack
      );
      throw new InternalServerErrorException(); // so the error stays in the backend
    }
  }
}
