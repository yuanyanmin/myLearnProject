<template>
  <transition name='fade'>
    <div v-show="showWrap" 
         :class="position"
         class="toastMessageBox">
    {{message}}
    </div>
  </transition>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      message: '',
      showWrap: true,  // 是否显示组件
      position: '',
    }
  },
}
</script>

<style lang="less">
  .toastMessageBox {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%) scale(1);
    background-color: rgba(0, 0, 0, 0.8);
    color: #ffffff;
    padding: 8px;
    font-size: 16px;
    border-radius: 8px;
    text-align: center;
  }
  .toastMessageBox.middle{
      top:50%;
  }
  .toastMessageBox.top{
      top:10%;
  }
  .toastMessageBox.bottom{
      top:90%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: transform .5s
  }
  .fade-enter, .fade-leave-active {
    transform:translate(-50%,-50%) scale(0);
  }

</style>