<template>
  <teleport to="body">
    <div class="music-mask" @click="hide">
      <slot></slot>
    </div>
  </teleport>
</template>

<script>
export default {
  name: 'MusicMask',
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const hide = () => {
      emit('update:modelValue', !props.modelValue);
    };
    return { hide };
  }
};
</script>

<style scoped lang="less">
.music-mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
