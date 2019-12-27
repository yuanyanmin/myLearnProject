import { Injectable, Inject } from '@nestjs/common'
import { TodoList } from '../vo/todoList.vo'

@Injectable()
export class TodoListService {
  constructor(@Inject('TodoListModelToken') private readonly todoListModel) {}
  
  async addTask(param: {
    status: number,
    name: string
  }, context: any): Promise<TodoList> {
    let task: any = {};
    task.status = param.status;
    task.name = param.name;
    let result = await this.todoListModel.create(task);
    return result;
  }

  async getTask() {
    let res = await this.todoListModel.find().exec();
    let result: TodoList[] = [];
    res.forEach(item => {
      let rp = new TodoList();
      rp._id = item._id;
      rp.name = item.name;
      rp.status = item.status;
      result.push(rp)
    })
    return res;
  }

  async findTask(taskId: string): Promise<any> {
    return await this.todoListModel.find({_id: taskId})
  }

  async updateTask(taskId: string): Promise<void> {
    return await this.todoListModel.updateOne({_id: taskId}, {$set:{ status: 1 }})
  }

  async delTask(taskId: string): Promise<void> {
    return await this.todoListModel.remove({_id: taskId})
  }
}