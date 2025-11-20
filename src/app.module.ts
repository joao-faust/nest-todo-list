import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksModule } from './tasks/tasks.module';
import { User } from './users/users.entity';
import { LoginModule } from './login/login.module';
import { UsersModule } from './users/users.module';
import { Task } from './tasks/tasks.entity';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './lib/env';

@Module({
  imports: [
    UsersModule,
    LoginModule,
    TasksModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: DB_PORT,
      database: DB_NAME,
      username: DB_USER,
      password: DB_PASSWORD,

      entities: [User, Task],
      synchronize: true,
    }),
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
