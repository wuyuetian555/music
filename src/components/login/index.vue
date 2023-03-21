<template>
  <div class="contianer" @click="$event.stopPropagation()">
    <el-card class="login-register" shadow="always">
      <div class="login-header">
        <i
          class="iconfont icon-guanbi"
          @click.stop="$emit('update:show', !props.show)"
        ></i>
      </div>
      <div @click="$event.stopPropagation()">
        <Login v-show="showLogin" v-model:showLogin="showLogin"> </Login>
        <Register v-show="!showLogin" v-model:showLogin="showLogin"></Register>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import Register from "./components/register.vue";
import Login from "./components/login.vue";
import { ref } from "vue";
const showLogin = ref(true);
const props = defineProps({
  show: {
    type: Boolean,
  },
});
const emit = defineEmits(["update:show"]);
</script>

<style scoped lang="less">
.contianer {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  background-color: rgba(77, 74, 74, 0.3);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-register {
    width: 380px;
    background-color: @topColor;
    color: @primaryTextColor;
    border: none;
    .login-header {
      text-align: right;
      i {
        cursor: pointer;
        font-size: 20px;

        &:hover {
          font-weight: bold;
        }
      }
    }
  }
}
</style>
