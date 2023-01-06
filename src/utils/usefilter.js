export const filterTime = (value) => {
  var minutes =
    Math.floor(value / 60) < 10
      ? "0" + Math.floor(value / 60)
      : Math.floor(value / 60);
  var seconds =
    Math.round(value % 60) < 10
      ? "0" + Math.round(value % 60)
      : Math.round(value % 60);
  return minutes + ":" + seconds;
};
