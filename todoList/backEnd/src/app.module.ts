import { Module } from '@nestjs/common'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { todoListProvider } from './todoList/todoList.provider';
import { TodoListController } from './todoList/todoList.controller';
import { databaseProvider } from './database/database.provider';


@Module({
  imports: [],
  controllers: [AppController, TodoListController],
  providers: [AppService, ...todoListProvider, ...databaseProvider],
})

export class AppModule{}