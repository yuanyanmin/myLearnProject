import { Controller, Get, Post, Body, Req, UseInterceptors } from '@nestjs/common'
import { TodoListService } from './todoList.service'
import { TodoList } from 'src/vo/todoList.vo';
import { ProcessException } from '../exception/process.exception'
import { TransResult } from '../interceptor/trans-result.interceptor'

@UseInterceptors(TransResult)
@Controller('task')
export class TodoListController {
  constructor(private todoListService: TodoListService) {}

  // 新增任务
  @Post('/addTask')
  async addTask(@Req() req:any): Promise<any> {
    try {
      let todoList = new TodoList();
      let res = await this.todoListService.addTask(todoList)
      return {
        id: res._id
      }
    } catch (err) {
      throw new ProcessException('添加失败', err.message)
    }
  }

  // 获取所有任务
  @Get('/getTask')
  async getTask() {
    try {
      return this.todoListService.getTask();
    } catch (err) {
      throw new ProcessException('获取失败', err.message)
    }
  }

  // 修改任务状态
  @Post('/updateTask')
  async updateTask(@Req() req:any) {
    await this.todoListService.findTask(req.body.id).then(res => {
      return this.todoListService.updateTask(req.body.id);
    }).catch(err => {
      throw new ProcessException('任务不存在');
    });
  }
}