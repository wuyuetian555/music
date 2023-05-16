import { createVNode, render } from 'vue';
import MusicDialog from './music-dialog.vue';

// 准备一个DOM
const div = document.createElement('div');
div.setAttribute('class', 'music-drawer');
document.body.appendChild(div);

// 返回的是promise对象，点取消销毁组件，点确认销毁组件
export default ({ show, hidebtn, text, title }) => {
  // 1. 导入被创建的组件
  // 2. 使用createVNode创建虚拟节点
  // 3. 准备一个dom容器装载组件
  // 4. 使用render函数渲染组件到容器s

  // 点击取消触发的函数
  const cancelCallback = () => {
    render(null, div);
  };
  // 点击确认触发的函数

  const vn = createVNode(MusicDialog, {
    show,
    hidebtn,
    text,
    title,
    cancelCallback
  });
  render(vn, div);

  // 点击取消触发的函数
};
