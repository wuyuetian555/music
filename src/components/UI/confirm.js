import { createVNode, render } from "vue";
import MusicConfirm from "./music-confirm.vue";

// 准备一个DOM

const body = document.querySelector("body");

// 返回的是promise对象，点取消销毁组件，点确认销毁组件
export default () => {
  // 1. 导入被创建的组件
  // 2. 使用createVNode创建虚拟节点
  // 3. 准备一个dom容器装载组件
  // 4. 使用render函数渲染组件到容器
  return new Promise((resolve, reject) => {
    // 点击取消触发的函数
    const cancelCallback = () => {
      render(null, body);
      resolve(false);
    };
    // 点击确认触发的函数
    const submitCallback = () => {
      render(null, body);
      resolve(true);
    };

    const vn = createVNode(MusicConfirm, {
      cancelCallback,
      submitCallback,
    });
    render(vn, body);
  });
};
