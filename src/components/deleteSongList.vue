<template>
  <div class="delete-song-list">
    <div class="action">
      <music-button icon="icon-lajitong1" @click="deleteList"
        >删除</music-button
      >
      <music-button icon="icon-tuichubianji" @click="$emit('backAction')"
        >退出</music-button
      >
    </div>
    <div class="songlist">
      <div class="title">
        <div style="flex: 6">
          <div @click="handleAllDelete">
            <i
              class="iconfont icon-checkbox-weixuan"
              v-show="!isAllDelete"
              data-delete
            ></i>
            <i
              class="iconfont icon-CheckboxChecked"
              v-show="isAllDelete"
              data-delete
            ></i>
            <span data-delete>全选</span>
          </div>
        </div>
        <span style="flex: 2">歌手</span>
        <span style="flex: 2">专辑</span>
      </div>
      <div class="list" :style="{ height }">
        <div
          class="list-item"
          v-for="item in data"
          :key="item.musicId"
          @click="handleClick(item)"
        >
          <div style="flex: 6" class="list-item-name ellipsis">
            <i
              class="iconfont icon-checkbox-weixuan"
              v-show="item.delete == false || !item.delete"
            ></i>
            <i
              class="iconfont icon-CheckboxChecked"
              v-show="item.delete == true"
            ></i>
            <span>{{ item.musicName }}</span>
          </div>
          <span class="ellipsis" style="flex: 2">{{ item.Singer }}</span>
          <span class="ellipsis" style="flex: 2">{{ item.zhuanji }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'DeleteList',
  emit: ['backAction', 'deletSongList'],
  props: {
    musicListData: Object,
    height: {
      default: '65vh'
    }
  },

  setup(props, { emit }) {
    const isAllDelete = ref(false)
    const data = ref(JSON.parse(JSON.stringify(props.musicListData)))
    const handleAllDelete = () => {
      isAllDelete.value = !isAllDelete.value
      if (isAllDelete.value) {
        data.value.forEach((item) => {
          item.delete = true
        })
      } else {
        data.value.forEach((item) => {
          item.delete = false
        })
      }
    }
    const handleClick = (item) => {
      item.delete = !item.delete
    }
    const deleteList = () => {
      const newData = data.value.filter((item) => {
        return !item.delete
      })
      if (newData.length == data.value.length) return
      if (newData.length == 0) {
        emit('deletSongList', newData)
        emit('backAction')
      } else {
        data.value = newData
        emit('deletSongList', newData)
      }
    }
    watch(data.value, (newVal) => {
      let show = false
      for (let index = 0; index < newVal.length; index++) {
        if (!newVal[index].delete) {
          show = true
          break
        }
      }
      isAllDelete.value = show || true
    })
    return { isAllDelete, handleAllDelete, handleClick, data, deleteList }
  }
}
</script>

<style scoped lang="less">
.delete-song-list {
  padding: @primaryPadding;
}
.action {
  button {
    margin-right: 15px;
  }
}
.songlist {
  display: flex;
  flex-direction: column;
  color: @primaryTextColor;

  .title {
    display: flex;
    color: @primaryTextColor;

    > span,
    > div {
      height: 30px;
      font-size: 15px;
      line-height: 30px;
      flex-shrink: 0;
      padding: 10px;
      box-sizing: content-box;

      div {
        display: inline-block;
        cursor: pointer;
      }

      i {
        margin-right: 8px;
      }
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    overflow: auto;

    .list-item {
      display: flex;
      cursor: pointer;
      align-items: center;

      &:hover {
        background-color: @highlightColor;
      }

      i {
        color: @primaryTextColor;
        margin-right: 8px;
      }

      .list-item-name {
        padding: 10px;
        font-size: 17px;
        height: 30px;
        line-height: 30px;
        box-sizing: content-box;
        display: flex;
        align-items: center;

        span {
          padding: 0;
        }
      }

      & > span {
        padding: 10px;
        font-size: 17px;
        height: 30px;
        line-height: 30px;
        box-sizing: content-box;
      }
    }
  }
}
</style>
