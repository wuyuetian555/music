import { ref, watch } from "vue";
import { genFileId } from "element-plus";
import { ElMessage } from "element-plus";
import { uploadMusicRequest } from "@/api/user";
import { useStore } from "vuex";
export const handleImg = (musicBg) => {
  const dialogImageUrl = ref("");
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
      const element = document.querySelector(".el-upload--picture-card");
      newVal.length
        ? (element.style.visibility = "hidden")
        : (element.style.visibility = "visible");
    },
    { deep: true }
  );
  return {
    dialogImageUrl,
    dialogVisible,
    handleRemove,
    handlePictureCardPreview,
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
    handleExceed,
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
}) => {
  const store = useStore();
  const submitUpload = async (formRef) => {
    if (!formRef) return;
    await formRef.validate((valid, fields) => {
      if (valid) {
        formData.append(
          "data",
          JSON.stringify({ ...form, user: store.state.user.userinfo.email })
        );
        musicBg.value.length
          ? formData.append("image", musicBg.value[0].raw)
          : null;
        formData.append("file", musicFile.value[0].raw);
        upload.value.submit();
      } else {
        ElMessage({
          type: "error",
          message: "必填项未填完，请完成后再尝试该操作！",
        });
      }
    });
  };
  const startUploadMusic = () => {
    uploadMusicRequest({
      formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(({ status }) => {
        formData = new FormData();
        if (status == 200) {
          upload.value.clearFiles();
          uploadImg.value.clearFiles();
          formRef.value.resetFields();
          ElMessage({
            type: "success",
            message: "歌曲上传成功！",
          });
        }
      })
      .catch((res) => {
        formData = new FormData();
      });
  };
  return {
    submitUpload,
    startUploadMusic,
  };
};
