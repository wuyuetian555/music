export default (lyric) => {
  let re = /\[([^\]]+)\]([^\[]+)/g;
  let result = [];
  lyric.replace(re, function ($0, $1, $2) {
    result.push({
      time: formatTimeToSec($1),
      lyric: $2,
    });
  });
  result = result.filter((item) => {
    item.lyric = item.lyric.replace(/^[ ]*\n[ ]*$/g, "\n");
    return item.lyric != "\n";
  });

  return result;
};
function formatTimeToSec(time) {
  var arr = time.split(":");
  return (parseFloat(arr[0]) * 60 + parseFloat(arr[1])).toFixed(2);
}
