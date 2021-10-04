import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "./task-status.enum";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository
  ) {}

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }
  /*  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    // define a temporary array to hold the result
    let tasks = this.getAllTasks();
    // do smthg with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    // do smthg with search
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }
    // finally return tasks
    return tasks;
  }
  */
  // on retourne une promesse de type "Task"
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Task with id = '${id}' : not found`);
    } else {
      return found;
    }
  }

  async updateTask(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with id = '${id}' : not found`);
    }
  }
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
}
