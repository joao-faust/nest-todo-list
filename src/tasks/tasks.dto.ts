import { Type } from 'class-transformer';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { TaskStatus } from 'src/tasks/tasks.types';

export class CreateTaskDto {
  @MaxLength(40)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(250)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  finishAt: Date;
}

export class UpdateTaskDto {
  @MaxLength(40)
  @IsString()
  @IsOptional()
  name?: string;

  @MaxLength(250)
  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(Object.values(TaskStatus))
  @IsOptional()
  status?: TaskStatus;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  finishAt?: Date;
}
