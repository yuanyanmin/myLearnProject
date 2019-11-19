import base from './base'

const ADD_TASK = '/api/task/addTask';
const GET_TASK = '/api/task/getTask';
const UPDATE_TASK = '/api/task/updateTask';

export default {
  async addTask(data) {
    return await base.post(ADD_TASK, data)
  },

  async getTask(data) {
    return await base.get(GET_TASK, data)
  },

  async updateTask(data) {
    return await base.post(UPDATE_TASK, data)
  }
}