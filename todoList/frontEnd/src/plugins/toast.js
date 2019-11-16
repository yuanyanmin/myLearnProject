import toast from "../components/toast.vue";

let Toast = {};
Toast.install = (Vue, option = {}) => {
  const ToastTem = Vue.extend(toast);
  let removeDom = event => {
    if (event.target.parentNode.childNodes.length > 1) {
      event.target.parentNode.removeChild(event.target);
    } else {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode);
    }
  };
  // 实现toast的关闭方法
  ToastTem.prototype.close = function() {
    this.showWrap = false;
    this.$el.addEventListener("transitionend", removeDom);
  };
  // 用户可以在Vue实例（Vue单文件就是一个Vue实例）通过this.$toast来访问以下内容
  Vue.prototype.$toast = option => {
    // toast实例挂载到刚创建的div
    var instance = new ToastTem().$mount(document.createElement("div"));
    let duration = option.duration || 3000;
    instance.message = typeof option === "string" ? option : option.message;
    instance.position = option.position || "middle";
    // 将toast的DOM挂载到DOM上
    document.body.appendChild(instance.$el);
    instance.visible = true;
    Vue.nextTick(() => {
      instance.timer = setTimeout(function() {
        instance.close();
      }, duration);
    });
    return instance;
  };
};
export default Toast;
