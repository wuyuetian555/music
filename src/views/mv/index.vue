<template>
  <div class="mv">
    <video
      :src="src"
      v-if="src"
      controls="controls"
      autoplay="autoplay"
      loop="loop"
    ></video>
  </div>
</template>

<script>
import { findMusicMv } from "@/api/music";
import { useRoute } from "vue-router";
import { ref } from "vue";
import useMusicControl from "@/hooks/useMusicControl";
export default {
  name: "MV",
  setup() {
    const route = useRoute();
    const mvId = route.params.mvId;
    const src = ref(null);
    const { pauseMusic } = useMusicControl();
    findMusicMv(mvId).then(({ data }) => {
      pauseMusic();
      src.value = data.url;
    });
    return { src };
  },
};
</script>

<style scoped lang="less">
.mv {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: @primaryPadding;
}
video {
  width: 100%;
  aspect-ratio: 16/9;
}
</style>
