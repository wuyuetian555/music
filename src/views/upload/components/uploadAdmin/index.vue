<template>
  <div class="upload-admin">
    <el-card>
      <el-table :data="musicData" style="width: 100%" :lazy="true">
        <el-table-column
          v-for="(item, index) in tableData1"
          :key="index"
          :label="item.label"
          align="center"
        >
          <template v-if="item.prop == 'uploadTime'" #default="scope">
            <el-icon><timer /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.uploadTime }}</span>
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
          <template #default v-else-if="item.prop == 'status'">
            <el-button size="small" type="warning">审核中</el-button>
            <el-button size="small" type="danger">未通过</el-button>
            <el-button size="small" type="success">发布成功</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { Timer } from "@element-plus/icons-vue";
import { tableData1 } from "./index";
const handleEdit = () => {
  console.log(index, row);
};
const handleDelete = () => {
  console.log(index, row);
};

const musicData = [
  {
    uploadTime: "2016-05-03",
    musicName: "如果我们不曾相遇",
    Singer: "五月天",
    zhuanji: "自传",
    musicBg: "",
  },
  {
    uploadTime: "2016-05-03",
    musicName: "如果我们不曾相遇",
    Singer: "五月天",
    zhuanji: "自传",
    musicBg: "/images/1.jpg",
  },
  {
    uploadTime: "2016-05-03",
    musicName: "如果我们不曾相遇",
    Singer: "五月天",
    zhuanji: "自传",
    musicBg: "/images/1.jpg",
  },
  {
    uploadTime: "2016-05-03",
    musicName: "如果我们不曾相遇",
    Singer: "五月天",
    zhuanji: "自传",
    musicBg: "/images/1.jpg",
  },
];
</script>

<style scoped lang="less">
.upload-admin {
  margin-top: 20px;
  background-color: @primaryColor;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);
  z-index: 1;
}
::v-deep .el-table .el-table__cell {
  //解决层级穿透 使得 子元素不与其产生新的层叠关系
  position: static;
}
</style>
