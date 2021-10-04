import { Task } from "./task.entity";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";

import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Body,
  Param,
} from "@nestjs/common";

@Controller("tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}
  // get handler
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    // if we have any filter defined, call tasksService.getTasksWithFilters
    return this.tasksService.getTasks(filterDto);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }
  @Get("/:id")
  getTaskById(@Param("id") id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  @Delete("/:id")
  deleteTask(@Param("id") id: string): Promise<void> {
    return this.tasksService.deleteTask(id);
  }

  @Patch("/:id/status")
  updateTask(
    @Param("id") id: string,
    @Body() updateTasksStatusDto: UpdateTaskStatusDto
  ): Promise<Task> {
    const { status } = updateTasksStatusDto;
    return this.tasksService.updateTask(id, status);
  }
}
