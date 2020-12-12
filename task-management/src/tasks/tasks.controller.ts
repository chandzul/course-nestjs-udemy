import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  // @Post()
  // createTask(@Body() body) {
  //   console.log('body', body);
  // }
  
  // @Post()
  // createTask(
  //   @Body('title') title: string,
  //   @Body('description') description: string,
  //   ): Task {
  //   return this.tasksService.createTask(title, description);
  // }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string, 
    @Body('status') status: TaskStatus
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
  
}