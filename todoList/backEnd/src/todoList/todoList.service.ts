import { Injectable, Inject } from '@nestjs/common'

@Injectable()
export class TodoListService {
  constructor(@Inject('TodoListModelToken') private readonly todoListModel) {}
  
  async addTask(task) {
    console.log('task', task)
    // const createdTask = new this.todoListModel(task)
    // return await createdTask.save()
    await this.todoListModel.create(task, (err, doc) => {
      if (!err) {
        console.log('添加成功了', " 数据 : ", doc)
      }
    })
  }

  async getTask() {
    return await this.todoListModel.find().exec();
  }
}