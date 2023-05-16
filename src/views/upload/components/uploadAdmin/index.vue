<template>
  <el-card class="upload-admin">
    <el-table
      :data="musicData"
      style="width: 100%"
      :lazy="true"
      max-height="650px"
      :cell-style="{ background: 'revert' }"
    >
      <el-table-column
        v-for="(item, index) in tableData1"
        :key="index"
        :label="item.label"
        align="center"
      >
        <template v-if="item.prop == 'create_time'" #default="scope">
          <span style="margin-left: 10px">{{
            new Date(scope.row.create_time).toLocaleString()
          }}</span>
        </template>
        <template #default="scope" v-else-if="item.prop == 'musicName'">
          <span>{{ scope.row.musicName }}</span>
        </template>
        <template #default="scope" v-else-if="item.prop == 'Singer'">
          <span>{{ scope.row.Singer }}</span>
        </template>
        <template #default="scope" v-else-if="item.prop == 'zhuanji'">
          <span>{{ scope.row.zhuanji }}</span>
        </template>
        <template #default="scope" v-else-if="item.prop == 'musicBg'">
          <el-image
            v-if="scope.row.musicBg"
            style="width: 90px; height: 120px"
            :src="scope.row.musicBg"
            fit="cover"
            :preview-src-list="[scope.row.musicBg]"
          >
          </el-image>
          <span v-else>无</span>
        </template>
        <template #default="{ row }" v-else-if="item.prop == 'state'">
          <el-button size="small" type="warning" v-if="row.state == 0"
            >审核中</el-button
          >
          <el-button size="small" type="danger" v-else-if="row.state == 2"
            >未通过</el-button
          >
          <el-button size="small" type="success" v-else>发布成功</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup>
import { tableData1 } from './index';
import { getUserUploadMusicRequest } from '@/api/user';
import { onBeforeMount, ref } from 'vue';
const musicData = ref([]);
onBeforeMount(async () => {
  const { data } = await getUserUploadMusicRequest();
  musicData.value = data;
});
</script>

<style scoped lang="less">
.upload-admin {
  margin-top: 20px;
  background-color: @primaryColor;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
}
::v-deep .el-table .el-table__cell {
  position: static;
}

::v-deep .el-table__row {
  background-color: transparent;
}

::v-deep .el-table__inner-wrapper {
  background-color: transparent;
}
::v-deep .el-table {
  background-color: transparent;
  color: @primaryTextColor !important;
}
::v-deep .el-table__row:hover {
  background-color: @highlightColor !important;
}
::v-deep .el-table th.el-table__cell {
  background-color: transparent !important;
}
::v-deep .el-table tr {
  color: @primaryTextColor !important;
  background-color: transparent !important;
}
</style>
