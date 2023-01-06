<template>
  <div class="Time">
    <h1>
      {{ time.getHours() < 10 ? "0" + time.getHours() : time.getHours() }}
    </h1>
    <span class="iconfont icon-a-maohao3x"></span>
    <h1>
      {{ time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes() }}
    </h1>
    <span class="iconfont icon-a-maohao3x"></span>
    <h1>
      {{ time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds() }}
    </h1>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "Time",
  setup() {
    const time = ref(new Date());
    setInterval(() => {
      time.value = new Date();
    }, 1000);
    return { time };
  },
};
</script>

<style scoped lang="less">
div {
  height: 66px;
  line-height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;
}
h1 {
  display: inline-block;

  color: @primaryTextColor;
}
span {
  font-size: 40px;
  color: @primaryTextColor;

  display: inline-block;
}
</style>
