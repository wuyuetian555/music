<template>
  <el-card class="uploadMusic">
    <el-form :model="form" label-width="120px" :rules="rules" ref="formRef">
      <el-form-item label="歌曲名称：" required prop="musicName">
        <el-col :span="10">
          <el-input v-model="form.musicName" placeholder="歌曲名称为必填项"
        /></el-col>
      </el-form-item>
      <el-form-item label="歌曲作者：" required prop="Singer">
        <el-col :span="10">
          <el-input v-model="form.Singer" placeholder="歌曲作者为必填项">
          </el-input
        ></el-col>
      </el-form-item>
      <el-form-item label="歌曲专辑：" prop="zhuanji">
        <el-col :span="10">
          <el-input v-model="form.zhuanji" placeholder="歌曲专辑为选填项" />
        </el-col>
      </el-form-item>
      <el-form-item label="歌曲专辑图片：">
        <el-upload
          list-type="picture-card"
          :auto-upload="false"
          v-model:file-list="musicBg"
          :limit="1"
          class="el-upload"
          ref="uploadImg"
          accept=".png,.jfif,.pjpeg,.jpeg,.pjp,.jpg,.webp"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>

                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" /> </el-dialog
      ></el-form-item>
      <el-form-item label="歌曲资源：" prop="resource">
        <el-upload
          ref="upload"
          class="upload-demo"
          v-model:file-list="musicFile"
          :limit="1"
          :on-exceed="handleExceed"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :http-request="startUploadMusic"
          accept=".MP3,.WMA,.WAV,.APE,.FLAC,.OGG,.AAC,.m4a"
        >
          <template #trigger>
            <el-button type="primary">选择音乐文件</el-button>
          </template>

          <template #tip>
            <div class="el-upload__tip text-red">需为音乐格式的文件</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitUpload(formRef)"
          >发布</el-button
        >
        <el-button>保存</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue';
import { handleImg, handleMusic, uploadMusic } from './index';

const form = reactive({
  musicName: '',
  Singer: '',
  zhuanji: ''
});
const formRef = ref();
const upload = ref();
const uploadImg = ref();
const musicFile = ref([]);
const musicBg = ref([]);
const formData = new FormData();
let loading;
const {
  dialogImageUrl,
  dialogVisible,
  handleRemove,
  handlePictureCardPreview
} = handleImg(musicBg);
const { handleExceed } = handleMusic(upload);
const { submitUpload, startUploadMusic } = uploadMusic({
  formData,
  musicFile,
  musicBg,
  form,
  upload,
  uploadImg,
  formRef,
  loading
});
const beforeUpload = (file) => {};
const checkMusicResource = (rule, value, callback) => {
  if (musicFile.value.length) {
    callback();
  } else {
    callback(new Error('请选择音乐文件'));
  }
};

const rules = reactive({
  musicName: [{ required: true, message: '请输入歌曲名称' }],
  Singer: [{ required: true, message: '请输入歌手名字' }],
  resource: [{ validator: checkMusicResource }]
});
</script>
<style scoped lang="less">
.uploadMusic {
  margin-top: 20px;
  background-color: @primaryColor;
  border: none;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);

  .el-form {
    ::v-deep .el-form-item__label {
      color: @primaryTextColor !important;
    }
    .el-upload {
      ::v-deep .el-upload-list__item-thumbnail {
        object-fit: cover;
      }
    }
  }
}
</style>
