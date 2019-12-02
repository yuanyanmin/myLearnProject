import { Injectable, Inject } from '@nestjs/common'
import { TodoList } from '../vo/todoList.vo'

@Injectable()
export class TodoListService {
  constructor(@Inject('TodoListModelToken') private readonly todoListModel) {}
  
  async addTask(task) {
    let result = await this.todoListModel.create(task);
    return result;
  }

  async getTask() {
    let reqStartTime = Date.now()
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
    return await this.todoListModel.updateOne({taskId: taskId}, {$set:{ status: 1 }})
  }
}