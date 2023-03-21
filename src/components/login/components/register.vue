<template>
  <div class="register">
    <h1>Register</h1>
    <el-form
      :label-position="labelPosition"
      :model="formLabelAlign"
      status-icon
      :rules="rules"
      class="el-form"
      ref="ruleFormRef"
    >
      <el-form-item prop="user">
        <el-input
          v-model.number="formLabelAlign.user"
          placeholder="账号需由6-10位数字组成"
          :prefix-icon="UserFilled"
          clearable
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formLabelAlign.password"
          type="password"
          placeholder="密码为8~15位,必须包含字母数字"
          :prefix-icon="Lock"
          clearable
        />
      </el-form-item>
      <el-form-item prop="checkPassword">
        <el-input
          v-model="formLabelAlign.checkPassword"
          type="password"
          placeholder="请再次输入密码"
          :prefix-icon="Lock"
          clearable
        />
      </el-form-item>
      <el-form-item prop="email">
        <el-input
          v-model="formLabelAlign.email"
          type="email"
          placeholder="请输入您的邮箱"
          :prefix-icon="Message"
          clearable
        />
      </el-form-item>

      <el-form-item prop="captcha" class="captcha-btn">
        <el-input v-model="formLabelAlign.captcha" placeholder="请输入验证码" />
        <el-button type="primary" :disabled="isDisabled" @click="getCaptcha">
          <span v-if="!isDisabled">获取验证码</span>
          <span v-else>{{ time }}</span>
        </el-button>
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          注册
        </el-button>
        <el-button
          type="primary"
          @click.stop="$emit('update:showLogin', !props.showLogin)"
        >
          返回登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { UserFilled, Lock, Message } from "@element-plus/icons-vue";
import { register, checkUser, checkEmail, sendEmail } from "@/api/user";
import { ElMessage } from "element-plus";
const emit = defineEmits(["update:showLogin"]);
const props = defineProps({
  showLogin: {
    type: Boolean,
  },
});
const ruleFormRef = ref();
const labelPosition = ref("right");
const isDisabled = ref(false);
const time = ref(10);
let timer;
const formLabelAlign = reactive({
  user: "",
  password: "",
  checkPassword: "",
  email: "",
  captcha: "",
});

const validateUser = async (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    let regExp = /^\d{6,10}$/;
    if (!regExp.test(value)) {
      callback(new Error("账号格式不对"));
    } else {
      const { status } = await checkUser({ user: formLabelAlign.user });
      status == 400 ? callback(new Error("该用户名已存在")) : callback();
    }
  }
};
const validatePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    let regExp = /^[A-Za-z0-9]{8,15}$/;
    if (!regExp.test(value)) {
      callback(new Error("密码格式不对"));
    } else {
      callback();
    }
  }
};
const validateCheckPassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请确认密码"));
  } else if (value !== formLabelAlign.password) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
};
const validateEmail = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入您的邮箱"));
  } else {
    callback();
  }
};
const validateCaptcha = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入邮箱验证码"));
  } else {
    const { status } = checkEmail({ email: formLabelAlign.email });
    status == 400 ? callback(new Error("该邮箱已存在")) : callback();
  }
};
const getCaptcha = () => {
  isDisabled.value = true;
  timer = setInterval(() => {
    time.value--;
    if (time.value == 0) {
      time.value = 10;
      clearInterval(timer);
      isDisabled.value = false;
    }
  }, 1000);
};
const rules = reactive({
  user: [{ validator: validateUser, trigger: "blur" }],
  password: [{ validator: validatePassword, trigger: "blur" }],
  checkPassword: [{ validator: validateCheckPassword, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  captcha: [{ validator: validateCaptcha, trigger: "blur" }],
});
const submitForm = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { status } = await register({
        user: formLabelAlign.user,
        password: formLabelAlign.password,
      });

      status == 200
        ? ElMessage({
            message: "恭喜您，账号注册成功。",
            type: "success",
          })
        : null;
    }
  });
};
</script>

<style scoped lang="less">
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 380px;

  h1 {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 32px;
  }

  .el-form {
    width: 85%;

    .el-form-item {
      ::v-deep label {
        color: @primaryTextColor;
      }
    }
  }

  .captcha-btn {
    ::v-deep .el-form-item__content {
      flex-wrap: nowrap;
      justify-content: space-between;

      .el-input {
        width: 60%;
      }

      button {
        width: 35%;
      }
    }
  }

  .login-btn {
    ::v-deep .el-form-item__label-wrap {
      color: @primaryTextColor;
    }

    ::v-deep .el-form-item__content {
      justify-content: space-between;

      button {
        width: 40%;
      }
    }
  }
}
</style>
