import store from '../store';
import { ElMessage } from 'element-plus';
export default (router) => {
  router.beforeEach((to, from, next) => {
    const user = store.state.user.userinfo.email;
    if (to.fullPath == '/upload' && !user) {
      ElMessage({
        type: 'warning',
        message: '请先完成登录'
      });
    } else {
      next();
    }
  });
};
