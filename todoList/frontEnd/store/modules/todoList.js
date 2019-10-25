import todoListApi from '../../src/api/todoList'

export default {
  state: {},
  mutations: {},
  actions: {
    addTask({state, commit, dispatch, rootState}, data) {
      let res = todoListApi.addTask(data);
      return res;
    },
    getTask({state, commit, dispatch, rootState}, data) {
      let res = todoListApi.getTask(data);
      return res;
    }
  }
}