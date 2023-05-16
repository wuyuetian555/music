import { ref, watch } from 'vue';
import { genFileId, ElMessage, ElLoading } from 'element-plus';
import { uploadMusicRequest } from '@/api/user';
import { useStore } from 'vuex';
export const handleImg = (musicBg) => {
  const dialogImageUrl = ref('');
  const dialogVisible = ref(false);
  const handleRemove = () => {
    musicBg.value.splice(0, 1);
  };

  const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
  };

  watch(
    () => musicBg.value,
    (newVal) => {
      const element = document.querySelector('.el-upload--picture-card');
      newVal.length
        ? (element.style.visibility = 'hidden')
        : (element.style.visibility = 'visible');
    },
    { deep: true }
  );
  return {
    dialogImageUrl,
    dialogVisible,
    handleRemove,
    handlePictureCardPreview
  };
};

export const handleMusic = (upload) => {
  const handleExceed = (files) => {
    upload.value.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    upload.value.handleStart(file);
  };

  return {
    handleExceed
  };
};
export const uploadMusic = ({
  formData,
  musicFile,
  musicBg,
  form,
  upload,
  uploadImg,
  formRef,
  loading
}) => {
  const store = useStore();
  const submitUpload = async (formRef) => {
    if (!formRef) return;
    await formRef.validate((valid, fields) => {
      if (valid) {
        if (loading) {
          loading.close();
        }
        loading = ElLoading.service({
          fullscreen: false,
          target: document.querySelector('div.container'),
          lock: true,
          text: '正在上传，请稍等',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        formData = new FormData();
        formData.append(
          'data',
          JSON.stringify({ ...form, user: store.state.user.userinfo.email })
        );
        musicBg.value.length && formData.append('image', musicBg.value[0].raw);
        formData.append('file', musicFile.value[0].raw);
        upload.value.submit();
      } else {
        ElMessage({
          type: 'error',
          message: '必填项未填完，请完成后再尝试该操作！'
        });
      }
    });
  };
  const startUploadMusic = () => {
    uploadMusicRequest({
      formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(({ status }) => {
      if (status == 200) {
        upload.value.clearFiles();
        uploadImg.value.clearFiles();
        formRef.value.resetFields();
        ElMessage({
          type: 'success',
          message: '歌曲上传成功！'
        });
        loading.close();
      }
    });
  };
  return {
    submitUpload,
    startUploadMusic
  };
};
