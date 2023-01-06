export default (obj) => {
  const newArr = obj.hotAlbums.map((item) => {
    return {
      albumName: item.name,
      publishTime: filterTime(item.publishTime),
      albumId: item.id,
      albumBg: item.blurPicUrl,
    };
  });
  return {
    code: obj.code,
    data: newArr,
    more: obj.more,
  };
};

export const filterTime = (time) => {
  let data = new Date(time);
  let year = data.getFullYear();
  let month = data.getMonth() + 1;
  let day = data.getDate();
  return `${year}-${month}-${day}`;
};
