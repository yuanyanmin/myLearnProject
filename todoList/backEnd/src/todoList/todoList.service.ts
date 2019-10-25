import { Injectable, Inject } from '@nestjs/common'
import { TodoList } from '../vo/todoList.vo'

@Injectable()
export class TodoListService {
  constructor(@Inject('TodoListModelToken') private readonly todoListModel) {}
  
  async addTask(task) {
    // const createdTask = new this.todoListModel(task)
    // return await createdTask.save()
    let reqStartTime = Date.now()
    await this.todoListModel.create(task, (err, doc) => {
      if (!err) {
        console.log('添加成功了', " 数据 : ", doc)
      }
    })
    return {
      useTime: Date.now() - reqStartTime,
      data: {
        msg: '添加成功'
      },
      status: 'success'
    }
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
    return {
      useTime: Date.now() - reqStartTime,
      data: result,
      status: 'success'
    }
  }
}