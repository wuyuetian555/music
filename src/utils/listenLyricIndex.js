export default ({ songLyric, length, scrollList, lyricindex, curTime }) => {
  for (var i = 0; i < length; i++) {
    if (songLyric[length - 1].time < curTime) {
      data.lyricindex = length - 1;
      break;
    }
    if (songLyric[i].time < curTime && songLyric[i + 1].time > curTime) {
      lyricindex = i;
      scrollList.scrollTop = lyricindex >= 8 ? (lyricindex - 7) * 32 : 0;

      break;
    }
  }
 
  return {
    lyricindex,
  };
};
