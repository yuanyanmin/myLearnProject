import { Injectable, Inject } from '@nestjs/common'
import { TodoList } from '../vo/todoList.vo'
import { ProcessException } from '../exception/process.exception'

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

  async updateTask(id: string): Promise<any> {
    let reqStartTime = Date.now()
    let task = await this.todoListModel.findOne({_id: id});
    let res = await this.todoListModel.updateOne({_id: id}, {$set:{ status: 1 }})
    return {
      useTime: Date.now() - reqStartTime,
      data: res,
      status: 'success'
    }
    // if (task) {
    //   await this.todoListModel.updateOne({_id: id}, {$set:{ status: 1 }})
    // } else {
    //   throw new ProcessException('未找到相应任务')
    // }
  }
}