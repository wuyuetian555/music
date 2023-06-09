<template>
  <div class="weather" v-if="icon">
    <span>{{ data.location }}</span>
    <i class="iconfont" :class="{ [icon]: icon }" v-if="option[data.code]"></i>
    <span>{{ data.text }}</span>
    <span>{{ data.temperature }}℃ </span>
  </div>
</template>

<script setup>
import { getWeatherData } from '@/api/weather';
import { onBeforeMount, reactive, ref } from 'vue';
const icon = ref(null);

const data = reactive({
  location: '',
  text: '',
  temperature: '',
  code: ''
});
const option = {
  0: 'icon-qing',
  1: 'icon-qing',
  4: 'icon-duoyun',
  5: 'icon-duoyun',
  6: 'icon-duoyun',
  7: 'icon-duoyun',
  8: 'icon-duoyun',
  9: 'icon-yin1',
  10: 'icon-zhenyu',
  11: 'icon-leizhenyu',
  12: 'icon-leizhenyu',
  13: 'icon-xiaoyu1',
  14: 'icon-zhongyu',
  15: 'icon-dayu',
  16: 'icon-baoyu',
  17: 'icon-dabaoyu-tedabaoyu1',
  18: 'icon-dabaoyu-tedabaoyu',
  19: 'icon-dongyu',
  20: 'icon-yujiaxue',
  21: 'icon-zhenxue',
  22: 'icon-xiaoxue',
  23: 'icon-zhongxue',
  24: 'icon-daxue',
  25: 'icon-baoxue',
  26: 'icon-fuchen',
  27: 'icon-fuchen',
  28: 'icon-shachenbao',
  29: 'icon-shachenbao',
  30: 'icon-wu',
  31: 'icon-mai',
  32: 'icon-feng',
  33: 'icon-dafeng',
  34: 'icon-jufeng',
  35: 'icon-tianqi-redaifengbao',
  36: 'icon-taifeng-longjuanfeng',
  37: 'icon-leng',
  38: 'icon-remen'
};

onBeforeMount(async () => {
  const result = await getWeatherData();
  try {
    data.location = result.results[0].location.name;
    data.text = result.results[0].now.text;
    data.temperature = result.results[0].now.temperature;
    data.code = result.results[0].now.code;
    icon.value = option[result.results[0].now.code];
  } catch (error) {}
});
</script>

<style scoped lang="less">
.weather {
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 14px;
  color: @primaryTextColor;
  span:last-child {
    margin-left: 10px;
  }
  .iconfont {
    color: @primaryTextColor;
    font-size: 19px;
    margin: 0 10px;
  }
}
</style>
