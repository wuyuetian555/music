export default (obj) => {
  const newArr = obj.hotAlbums.map((item) => {
    return {
      albumName: item.name,
      publishTime: filterTime(item.publishTime),
      albumId: item.id,
      albumBg: item.blurPicUrl
    };
  });
  return {
    code: obj.code,
    data: newArr,
    more: obj.more
  };
};

export const filterTime = (time) => {
  const data = new Date(time);
  const year = data.getFullYear();
  const month = data.getMonth() + 1;
  const day = data.getDate();
  return `${year}-${month}-${day}`;
};
