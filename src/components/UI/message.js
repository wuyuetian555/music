import { createVNode, render } from 'vue';
import MusicMessage from './music-message.vue';

const body = document.getElementsByTagName('body')[0];

export default () => {
  const vn = createVNode(MusicMessage);
  render(vn, body);
  setTimeout(() => {
    render(null, body);
  }, 3000);
};
