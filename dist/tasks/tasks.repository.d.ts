import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
export declare class TasksRepository extends Repository<Task> {
    createTask(createTaskDto: CreateTaskDto): Promise<Task>;
    getTasks(filterDto: GetTasksFilterDto): Promise<Task[]>;
}
