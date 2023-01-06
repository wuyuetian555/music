<template>
  <music-dialog
    @save="save"
    index="center"
    title="背景风格"
    width="1440px"
    height="80vh"
  >
    <template v-slot>
      <HeaderNav class="tags"></HeaderNav>
      <div class="tags-img">
        <div class="tags-img-item">
          <img src="@/assets/images/1.jpg" alt="" />
        </div>
        <div class="tags-img-item">
          <img src="@/assets/images/1.jpg" alt="" />
        </div>
        <div class="tags-img-item">
          <img src="@/assets/images/1.jpg" alt="" />
        </div>
        <div class="tags-img-item">
          <img src="@/assets/images/1.jpg" alt="" />
        </div>
        <div class="tags-img-item">
          <img src="@/assets/images/1.jpg" alt="" />
        </div>
        <div class="tags-img-item">
          <img src="@/assets/images/1.jpg" alt="" />
        </div>
      </div>
    </template>
  </music-dialog>
</template>

<script>
import HeaderNav from '@/components/headerNav.vue'
export default {
  name: 'Skin',
  components: { HeaderNav },
  setup () {
    const save = (value) => {
      console.log(111, value)
    }
    return { save }
  }
}
</script>

<style scoped lang="less">
.tags-img {
  display: flex;
  flex-wrap: wrap;
  .tags-img-item {
    flex-shrink: 0;
    overflow: hidden;
    text-align: left;
    flex-grow: 0;
    img {
      width: 250px;
      height: 180px;
      object-fit: cover;
      border-radius: 15px;
      margin: 0 10px;
      margin-bottom: 20px;
    }
  }
}
</style>
