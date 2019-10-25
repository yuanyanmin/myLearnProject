import * as mongoose from 'mongoose'

export const databaseProvider = [
  {
    provide: 'DbConnectionToken',
    useFactory: async () : Promise<mongoose.Connection> => {
      return await mongoose.connect('mongodb://localhost:27017/todoList', {useNewUrlParser: true, useUnifiedTopology: true})
    }
  }
]