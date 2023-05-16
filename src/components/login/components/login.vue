<template>
  <div class="login">
    <h1>Login</h1>
    <el-form
      :label-position="labelPosition"
      :model="formLabelAlign"
      status-icon
      class="el-form"
      ref="ruleFormRef"
      :rules="rules"
    >
      <el-form-item prop="user">
        <el-input
          v-model="formLabelAlign.user"
          :prefix-icon="UserFilled"
          clearable
          placeholder="请输入您的邮箱"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="formLabelAlign.password"
          type="password"
          :prefix-icon="Lock"
          clearable
          placeholder="请输入您的密码"
        />
      </el-form-item>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
      </el-form-item>
    </el-form>
    <div
      class="login-footer"
      @click.stop="$emit('update:showLogin', !props.showLogin)"
    >
      <em>还没有账号?点击立即去注册！</em>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps } from 'vue';
import { UserFilled, Lock } from '@element-plus/icons-vue';
import { useStore } from 'vuex';
const labelPosition = ref('right');
const ruleFormRef = ref();
const formLabelAlign = reactive({
  user: '',
  password: ''
});

const props = defineProps({
  showLogin: { type: Boolean }
});
const store = useStore();
const submitForm = async (formEl) => {
  if (!formEl) return;

  await formEl.validate((valid) => {
    if (valid) {
      store.dispatch('user/requestLogin', {
        email: formLabelAlign.user,
        password: formLabelAlign.password
      });
    }
  });
};
const rules = reactive({
  user: [{ required: true, message: '请输入邮箱' }],
  password: [{ required: true, message: '请输入密码' }]
});
</script>

<style scoped lang="less">
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 300px;

  h1 {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-size: 32px;
  }
  .login-footer {
    margin-top: 10px;
    align-self: flex-end;
    color: @primaryTextColor;
    em {
      font-weight: bold;
    }
  }
  .el-form {
    width: 80%;
    .el-form-item {
      ::v-deep label {
        color: @primaryTextColor;
      }
    }
  }
  .login-btn {
    ::v-deep .el-form-item__label-wrap {
      color: @primaryTextColor;
    }
    ::v-deep .el-form-item__content {
      button {
        width: 100%;
      }
    }
  }
}
</style>
