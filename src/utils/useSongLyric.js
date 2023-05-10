export default ({ lyric, tlyric }) => {
  let re = /\[([^\]]+)\]([^\[]+)/g;
  let result = [];
  let tResult = {};
  if (lyric) {
    lyric.replace(re, function ($0, $1, $2) {
      result.push({
        initTime: formatTimeToSec($1),
        lyric: $2,
        time: $1,
      });
    });

    result = result.filter((item) => {
      item.lyric = item.lyric.replace(/^[ ]*\n[ ]*$/g, "\n");
      return item.lyric != "\n";
    });
  }
  if (tlyric) {
    tlyric.replace(re, ($0, $1, $2) => {
      tResult[$1] = $2;
    });
  } else {
    tResult = null;
  }
  return { result, tResult };
};

function formatTimeToSec(time) {
  var arr = time.split(":");
  return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(2);
}
