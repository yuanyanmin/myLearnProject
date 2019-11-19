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
    todoList.name = req.body.name;
    todoList.status = req.body.status;
    return this.todoListService.addTask(todoList);
  }

  // 获取所有任务
  @Get('/getTask')
  async getTask() {
    return this.todoListService.getTask();
  }

  // 修改任务状态
  @Post('/updateTask')
  async updateTask(@Req() req:any) {
    return this.todoListService.updateTask(req.body.id);
  }
}