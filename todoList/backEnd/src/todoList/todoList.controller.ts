import { Controller, Get, Post, Body, Req } from '@nestjs/common'
import { TodoListService } from './todoList.service'
import { TodoList } from 'src/vo/todoList.vo';

@Controller('task')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  // 新增任务
  @Post('/addTask')
  async addTask(@Req() req:any): Promise<any> {
    let todoList = new TodoList();
    todoList.name = req.query.name;
    todoList.status = req.query.status;
    return this.todoListService.addTask(todoList);
  }

  // 获取所有任务
  @Get()
  async getTask() {
    return this.todoListService.getTask();
  }
}