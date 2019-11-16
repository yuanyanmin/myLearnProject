export default {
  checkEmpty(val) {
    return !(val === undefined || val === null || /^\s*(\S+)\s*$/.test(val))
  },
  checkTodoListName(val) {
    return /^.{0,100}$/.test(val)
  },

}