import { filterTime } from '@/utils/usefilter';
export default (musicData) => {
  const result = musicData.map((item) => {
    return {
      musicName: item.name,
      musicId: item.id,
      musicMv: item.mv,
      zhuanji: item.al.name,
      zhuanjiId: item.al.id,
      musicBg: item.al.picUrl,
      Singer: item.ar[0].name,
      SingerId: item.ar[0].id,
      duration: filterTime(item.dt / 1000),
      iscanPlay: item.noCopyrightRcmd
    };
  });
  return result;
};
