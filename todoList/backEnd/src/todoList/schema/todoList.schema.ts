import * as mongoose from 'mongoose'

export const TodoListSchema = new mongoose.Schema({
  name: String,      // 任务名称
  status: Number,    // 是否完成 0 - 未完成，1 - 完成
})