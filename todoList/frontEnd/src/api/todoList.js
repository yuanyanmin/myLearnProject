import base from './base'

const ADD_TASK = '/api/task/addTask';
const GET_TASK = '/api/task/getTask';

export default {
  async addTask(data) {
    return await base.post(ADD_TASK, data)
  },

  async getTask(data) {
    return await base.get(GET_TASK, data)
  }
}