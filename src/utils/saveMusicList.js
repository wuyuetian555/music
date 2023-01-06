export const saveMusicList = (musicData, index) => {
  let playedMusic = JSON.parse(localStorage.getItem("playedMusic"));
  if (!playedMusic) {
    localStorage.setItem("playedMusic", JSON.stringify([]));
    playedMusic = JSON.parse(localStorage.getItem("playedMusic"));
  }
  playedMusic = playedMusic.filter((item) => {
    return item.musicId != musicData.data.data[index].musicId;
  });
  playedMusic.unshift(musicData.data.data[index]);
  localStorage.setItem("playedMusic", JSON.stringify(playedMusic));
};
