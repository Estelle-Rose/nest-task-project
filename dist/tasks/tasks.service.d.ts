import { Task } from "./task.entity";
import { TasksRepository } from "./tasks.repository";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
export declare class TasksService {
    private tasksRepository;
    constructor(tasksRepository: TasksRepository);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    getTaskById(id: string): Promise<Task>;
    updateTask(id: string, status: TaskStatus): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
}
