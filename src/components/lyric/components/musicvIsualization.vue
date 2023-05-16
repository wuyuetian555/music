<template>
  <div class="music-visualization">
    <canvas ref="cvs"></canvas>
  </div>
</template>

<script setup>
import {
  nextTick,
  onMounted,
  ref,
  onDeactivated,
  onActivated,
  computed,
  watch
} from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const audio = store.state.musicplay.audio;
const isStart = ref(true);
const color = computed(() => {
  return store.state.user.myThemeDetail;
});
const fillColor = ref('');

const theme = computed(() => {
  return store.state.user.theme;
});

const cvs = ref();
let ctx;
onMounted(() => {
  ctx = cvs.value.getContext('2d');
  cvs.value.width = 1400;
  cvs.value.height = 150;
});
let isInit = false;
let dataArray, analyser;
audio.ontimeupdate = () => {
  if (isInit) {
    return;
  }
  const audCtx = new AudioContext();
  const source = audCtx.createMediaElementSource(audio);
  analyser = audCtx.createAnalyser();
  analyser.fftSize = 512;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
  source.connect(analyser);
  analyser.connect(audCtx.destination);
  isInit = true;
};
const draw = () => {
  requestAnimationFrame(draw);
  const { width, height } = cvs.value;
  ctx.clearRect(0, 0, width, height);
  if (!isInit) {
    return;
  }
  if (!isStart.value) {
    return;
  }

  analyser.getByteFrequencyData(dataArray);
  const len = dataArray.length;
  const barWidth = width / len;
  ctx.fillStyle = fillColor.value;
  for (let i = 0; i < len; i++) {
    const data = dataArray[i];
    const barHeight = (data / 255) * height;
    const x = i * barWidth + width / 2;
    const x2 = width / 2 - (i + 1) * barWidth;
    const y = height - barHeight;
    ctx.fillRect(x, y, barWidth, barHeight);
    ctx.fillRect(x2, y, barWidth, barHeight);
  }
};
onDeactivated(() => {
  isStart.value = false;
});
onActivated(() => {
  isStart.value = true;
});
nextTick(() => {
  draw();
});
watch(
  () => theme.value,
  (newVal) => {
    if (newVal == 'dark') {
      fillColor.value = 'rgb(30,30,30)';
    } else if (newVal == 'default') {
      fillColor.value = 'rgb(246,248,249)';
    } else {
      fillColor.value = color.value.topColor;
    }
  },
  { immediate: true }
);
watch(
  () => color.value,
  (newVal) => {
    fillColor.value = newVal.topColor;
  },
  { deep: true }
);
</script>

<style scoped lang="less">
.music-visualization {
  height: 150px;
  text-align: center;
}
</style>
