<template>
  <div class="todo">
    <div class="banner">TodoList</div>
    <div class="content">
      <div class="add">
        <h3>添加任务</h3>
        <input type="text" placeholder="请输入代办事项" @keyup.enter="addTask" v-model="task">
        <button @click="addTask">添加</button>
      </div>
      <div class="list">
        <h3>任务列表</h3>
        <ul v-for="item in taskList" :key="item.label">
          <li><span></span><p>{{item.value}}</p></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      task: '',
      taskList: [
        { label: '01', value: '学习'},
        { label: '02', value: '吃饭'},
        { label: '03', value: '看电影'},
        { label: '04', value: '玩游戏'},
        { label: '05', value: '写笔记'},
        { label: '06', value: '读书'},
      ]
    }
  },
  methods: {
    addTask() {
      console.log('添加任务'); 
    }
  }
}
</script>

<style lang="less">
  .todo {
    width: 600px;
    margin: 0 auto;
    .banner {
      font-size: 24px;
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid #000;
    }
    .content {
      margin-top: 20px;
      .add {
        border-bottom: 1px solid #000;
        padding-bottom: 20px;
        h3 {
          font-size: 20px;
          padding: 10px;
        }
        input {
          width: 400px;
          height: 30px;
          line-height: 30px;
          background-color: transparent;
          border: 1px solid #000;
          margin: 10px;
          padding-left: 10px;
          outline: none;
        }
        button {
          margin-left: 30px;
          height: 30px;
          width: 100px;
          border: 1px solid #000;
          outline: none;
          cursor: pointer;
          background-color: #e6edec;
        }
      }
      .list {
        h3 {
          font-size: 20px;
          padding: 10px;
        }
        ul {
          margin-top: 10px;
          padding-left: 10px;
          li {
            font-size: 16px;
            height: 70px;
            background-color: #e6edec;
            margin-bottom: 35px;
            span {
              float: left;
              width: 70px;
              height: 70px;
              background-color: #9fc9bf;
            }
            p {
              padding-left: 85px;
              line-height: 70px;
            }
          }
        }
      }

    }
  }
</style>