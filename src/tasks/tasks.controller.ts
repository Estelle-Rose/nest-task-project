import { Task } from "./task.entity";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TasksService } from "./tasks.service";

import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import {
  Controller,
  Delete,
  Get,
  Logger,
  Patch,
  Post,
  Query,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "src/auth/get-user.decorator";
import { User } from "src/auth/user.entity";

@Controller("tasks")
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger("TasksController");

  constructor(private tasksService: TasksService) {}
  // get handler
  @Get()
  getTasks(
    @Query() filterDto: GetTasksFilterDto,
    @GetUser()
    user: User
  ): Promise<Task[]> {
    // affichage des logs
    this.logger.verbose(
      `User "${user.username}" retrieving all tasks. Filters: ${JSON.stringify(
        filterDto
      )}`
    );
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser()
    user: User
  ): Promise<Task> {
    // logs
    this.logger.verbose(
      `Le user ${user.username} crée une tache. Data: ${JSON.stringify(
        createTaskDto
      )}`
    );
    return this.tasksService.createTask(createTaskDto, user);
  }
  @Get("/:id")
  getTaskById(
    @Param("id") id: string,
    @GetUser()
    user: User
  ): Promise<Task> {
    return this.tasksService.getTaskById(id, user);
  }
  @Delete("/:id")
  deleteTask(
    @Param("id") id: string,
    @GetUser()
    user: User
  ): Promise<void> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch("/:id/status")
  updateTask(
    @Param("id") id: string,
    @Body() updateTasksStatusDto: UpdateTaskStatusDto,
    @GetUser()
    user: User
  ): Promise<Task> {
    const { status } = updateTasksStatusDto;
    return this.tasksService.updateTask(id, status, user);
  }
}
