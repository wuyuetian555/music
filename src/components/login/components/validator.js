import { checkEmail } from '@/api/user';
export const validator = (formLabelAlign) => {
  const validatePassword = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入密码'));
    } else {
      const regExp = /^[A-Za-z0-9]{8,15}$/;
      if (!regExp.test(value)) {
        callback(new Error('密码格式不对'));
      } else {
        callback();
      }
    }
  };
  const validateCheckPassword = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请确认密码'));
    } else if (value !== formLabelAlign.password) {
      callback(new Error('两次输入密码不一致'));
    } else {
      callback();
    }
  };
  const validateEmail = async (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入您的邮箱'));
    } else {
      const regExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
      if (!regExp.test(value)) {
        callback(new Error('邮箱格式不对'));
      } else {
        const { status } = await checkEmail({ email: formLabelAlign.email });
        if (status == 400) {
          callback(new Error('该邮箱已存在'));
        } else {
          formLabelAlign.emailStatus = true;
          callback();
          return;
        }
      }
    }
    formLabelAlign.emailStatus = false;
  };
  const validateCaptcha = (rule, value, callback) => {
    if (value === '') {
      callback(new Error('请输入邮箱验证码'));
    } else {
      callback();
    }
  };
  return {
    validatePassword,
    validateCheckPassword,
    validateEmail,
    validateCaptcha
  };
};
