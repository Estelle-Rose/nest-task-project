import { Task } from "./task.entity";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
export declare class TasksController {
    private tasksService;
    constructor(tasksService: TasksService);
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getTaskById(id: string): Promise<Task>;
    deleteTask(id: string): Promise<void>;
    updateTask(id: string, updateTasksStatusDto: UpdateTaskStatusDto): Promise<Task>;
}
