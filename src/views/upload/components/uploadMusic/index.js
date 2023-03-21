import { ref, watch } from "vue";
import { genFileId } from "element-plus";
export const uploadImg = () => {
  const dialogImageUrl = ref("");
  const dialogVisible = ref(false);
  const musicBg = ref([]);
  const handleRemove = (file) => {
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
    musicBg,
    handleRemove,
    handlePictureCardPreview,
  };
};

export const uploadMusic = () => {
  const upload = ref();

  const handleExceed = (files) => {
    upload.value.clearFiles();
    const file = files[0];
    file.uid = genFileId();
    upload.value.handleStart(file);
  };

  const submitUpload = () => {
    upload.value.submit();
  };
  return {
    upload,
    handleExceed,
    submitUpload,
  };
};
