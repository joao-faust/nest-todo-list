import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Patch,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

import { EntityId } from 'src/lib/decorators/entity-id.decorator';
import { AccessTokenGuard } from 'src/login/guards/access-token.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

@Controller('task')
@UseGuards(new AccessTokenGuard(new JwtService()))
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Post()
  async create(
    @Req() request: Request,
    @Body(new ValidationPipe()) dto: CreateTaskDto,
  ) {
    return { id: (await this.tasksService.create(dto, request.user.id)).id };
  }

  @Get()
  async get(@Req() request: Request) {
    return await this.tasksService.get(request.user.id);
  }

  @Get(':id')
  async getById(@Req() request: Request, @EntityId() taskId: number) {
    return await this.tasksService.getById(taskId, request.user.id);
  }

  @Patch(':id')
  @HttpCode(204)
  async update(
    @Req() request: Request,
    @Body(new ValidationPipe()) dto: UpdateTaskDto,
    @EntityId() taskId: number,
  ) {
    return await this.tasksService.update(dto, taskId, request.user.id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Req() request: Request, @EntityId() taskId: number) {
    return await this.tasksService.delete(taskId, request.user.id);
  }
}
