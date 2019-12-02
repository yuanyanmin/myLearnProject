import todoListApi from '../../api/todoList'

export default {
  state: {},
  mutations: {},
  actions: {
    async addTask({state, commit, dispatch, rootState}, data) {
      let res = await todoListApi.addTask(data);
      return res;
    },
    async getTask({state, commit, dispatch, rootState}, data) {
      let res = await todoListApi.getTask(data);
      return res;
    },
    async updateTask({state, commit, dispatch, rootState}, data) {
      let res = await todoListApi.updateTask(data);
      return res;
    }
  }
}