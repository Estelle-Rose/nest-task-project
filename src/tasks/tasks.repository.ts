import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { TaskStatus } from "./task-status.enum";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  // create task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    await this.save(task);
    return task;
  }
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const query = this.createQueryBuilder("task"); // we create a query & "task" refers to the Task entity
    const { status, search } = filterDto;

    if (status) {
      query.andWhere("task.status = :status", { status });
    }
    if (search) {
      query.andWhere(
        // lower permet de gérer la sensibilité à la casse
        "LOWER(task.title)  LIKE LOWER(:search) OR LOWER(task.description) LIKE :search",
        { search: `%${search}%` }
      );
    }
    const tasks = await query.getMany();
    return tasks;
  }
}
