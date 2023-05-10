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
      <el-form-item prop="email" validate-status="success">
        <el-input
          v-model.trim="formLabelAlign.email"
          type="email"
          placeholder="请输入您的邮箱"
          :prefix-icon="Message"
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

      <el-form-item prop="captcha" class="captcha-btn">
        <el-input v-model="formLabelAlign.captcha" placeholder="请输入验证码" />
        <el-button
          type="primary"
          :disabled="isDisabled"
          @click="getCaptcha(ruleFormRef)"
        >
          <span v-if="!isDisabled">获取邮箱验证码</span>
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
import { reactive, ref, onUnmounted } from "vue";
import { UserFilled, Lock, Message } from "@element-plus/icons-vue";
import { register, sendEmail } from "@/api/user";
import { ElMessage } from "element-plus";
import { validator } from "./validator";

const emit = defineEmits(["update:showLogin"]);
const props = defineProps({
  showLogin: {
    type: Boolean,
  },
});
const ruleFormRef = ref();
const labelPosition = ref("right");
const isDisabled = ref(false);
const time = ref(60);
let timer;
const formLabelAlign = reactive({
  password: "",
  checkPassword: "",
  email: "",
  captcha: "",
  emailStatus: false,
});
const {
  validatePassword,
  validateCheckPassword,
  validateEmail,
  validateCaptcha,
} = validator(formLabelAlign);

const getCaptcha = async (ruleFormRef) => {
  if (formLabelAlign.emailStatus) {
    getEmailCode();
    return;
  }
  ruleFormRef.validateField(["email"], async (valid) => {
    if (valid) {
      await getEmailCode();
    }
  });
};
const getEmailCode = async () => {
  isDisabled.value = true;
  timer = setInterval(() => {
    console.log(555);
    time.value--;
    if (time.value == 0) {
      time.value = 60;
      clearInterval(timer);
      isDisabled.value = false;
    }
  }, 1000);
  const { status } = await sendEmail({ email: formLabelAlign.email });
  status == 200
    ? ElMessage({
        message: "验证码已发送。",
        type: "success",
      })
    : null;
};
const rules = reactive({
  password: [{ validator: validatePassword, trigger: "blur" }],
  checkPassword: [{ validator: validateCheckPassword, trigger: "blur" }],
  email: [{ validator: validateEmail, trigger: "blur" }],
  captcha: [{ validator: validateCaptcha, trigger: "blur" }],
});
const submitForm = async (ruleFormRef) => {
  if (!ruleFormRef) return;
  await ruleFormRef.validate(async (valid) => {
    if (valid) {
      const { status, errors } = await register({
        password: formLabelAlign.password,
        email: formLabelAlign.email,
        captcha: formLabelAlign.captcha,
      });

      if (status == 200) {
        ruleFormRef.resetFields();
        ElMessage({
          message: "恭喜您，账号注册成功。",
          type: "success",
        });
        emit("update:showLogin", !props.showLogin);
      } else {
        ElMessage({
          message: errors,
          type: "error",
        });
      }
    }
  });
};
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped lang="less">
.register {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 350px;

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
        width: 50%;
      }

      button {
        width: 45%;
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
