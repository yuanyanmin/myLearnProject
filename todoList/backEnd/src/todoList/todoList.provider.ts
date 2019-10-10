import { Connection } from 'mongoose'
import { TodoListSchema } from './schema/todoList.schema'
import { TodoListService } from './todoList.service'

export const todoListProvider = [
  {
    provide: "TodoListModelToken",
    useFactory: (connection: Connection) => connection.model('todoList', TodoListSchema),
    inject: ['DbConnectionToken']
  },
  TodoListService
]