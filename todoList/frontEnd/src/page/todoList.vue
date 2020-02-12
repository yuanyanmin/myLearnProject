<template>
  <div class="todo">
    <div class="banner">TodoList</div>
    <div class="content">
      <div class="add">
        <h3>添加任务</h3>
        <input
          type="text"
          placeholder="请输入代办事项"
          @keyup.enter="addTask"
          v-model="task"
        />
        <button @click="addTask">添加</button>
      </div>
      <div class="list">
        <div class="list-group">
          <p class="status-title">
            <span>待完成</span>
            <span class="list-sum">{{ waitNum }}</span>
          </p>
          <ul class="task-list">
            <li
              v-for="item in taskWaitList"
              :key="item._id"
              @click="completeTask(item)"
            >
              <div class="task-content">
                <span></span>
                <p>{{ item.name }}</p>
                <p class="delStatus" @click="delTask(item)">删除</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-group">
          <p class="status-title">
            <span>已完成</span>
            <span class="list-sum">{{ finishNum }}</span>
          </p>
          <ul class="task-list">
            <li
              v-for="item in taskFinishList"
              :key="item._id"
              @click="completeTask(item)"
            >
              <div class="task-content">
                <span class="checkStatus"></span>
                <p class="checkStatus">{{ item.name }}</p>
                <p class="delStatus" @click="delTask(item)">删除</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import validatorUtils from "../utils/validator-utils";

export default {
  data() {
    return {
      task: "",
      taskWaitList: [],
      taskFinishList: [],
      waitNum: 0,
      finishNum: 0
    };
  },
  methods: {
    async addTask() {
      console.log(
        "validatorUtils(this.task)",
        validatorUtils.checkTodoListName(this.task)
      );
      if (
        !validatorUtils.checkEmpty(this.task) &&
        validatorUtils.checkTodoListName(this.task)
      ) {
        let data = {
          name: this.task,
          status: 0
        };
        await this.$store
          .dispatch("addTask", data)
          .then(res => {
            this.getTask();
            this.$toast(res.data.message || "添加成功");
            this.task = "";
          })
          .catch(err => {
            this.$toast("添加失败");
            console.log(err);
          });
      }
    },
    async getTask() {
      let res = await this.$store.dispatch("getTask");
      res.data.map(item => {
        if (item.status == 1) {
          this.taskFinishList.push(item);
          this.finishNum++;
        } else {
          this.taskWaitList.push(item);
          this.waitNum++;
        }
      });
    },

    async completeTask(item) {
      if (item.status == 0) {
        await this.$store.dispatch("updateTask", { id: item._id });
        this.getTask();
      }
    },

    async delTask(item) {
      let res = await this.$store.dispatch("delTask", { id: item._id });
      this.getTask();
    }
  },
  async mounted() {
    this.getTask();
  }
};
</script>

<style lang="less">
.todo {
  width: 600px;
  margin: 0 auto;
  .banner {
    font-size: 24px;
    padding: 20px;
    text-align: center;
    background: rgba(47, 47, 47, 0.98);
    color: #fff;
  }
  .content {
    margin-top: 20px;
    .add {
      border-bottom: 1px dashed #000;
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
      .list-group {
        // border-bottom: 1px dashed #000;
        .status-title {
          font-size: 20px;
          padding: 10px;
          margin-bottom: 10px;
          .list-sum {
            float: right;
            width: 30px;
            height: 30px;
            background: rgba(47, 47, 47, 0.98);
            border-radius: 50%;
            color: #fff;
            line-height: 30px;
            text-align: center;
          }
        }
        .task-list {
          max-height: 500px;
          overflow-y: scroll;
        }
      }
      .list-group:last-child {
        margin-top: 20px;
        border: none;
      }
      ul {
        padding-left: 10px;
        .task-content {
          font-size: 16px;
          height: 70px;
          background-color: #e6edec;
          margin-bottom: 35px;
          position: relative;
          span {
            float: left;
            width: 70px;
            height: 70px;
            background-color: #9fc9bf;
          }
          span.checkStatus {
            &::after {
              content: "√";
              display: inline-block;
              width: 30px;
              height: 30px;
              margin: 20px 20px;
              text-align: center;
              line-height: 30px;
            }
          }
          p {
            padding-left: 85px;
            line-height: 70px;
          }
          p.checkStatus {
            text-decoration: line-through;
          }
          p.delStatus {
            position: absolute;
            top: 0;
            right: 10px;
            color: blue;
            cursor: pointer;
          }
        }
        li:last-child .task-content {
          margin: 0;
        }
      }
    }
  }
}

/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width: 8px;
  background-color: #ededed;
}

/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #cccccc;
}
</style>
