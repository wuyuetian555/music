var tinycolor = require("tinycolor2");
export const changeStyle = (obj) => {
  let root = document.querySelector(":root");
  for (let key in obj) {
    root.style.setProperty(`--${key}`, obj[key]);
  }
};

export const getHexString = (obj) => {
  let newObj = {};
  for (let key in obj) {
    let color = tinycolor(obj[key]);
    newObj[key] = color.toHexString();
  }
  return newObj;
};

export const getRgba = ({ currentThemeDetail, Alpha }) => {
  let newObj = {};
  for (let key in currentThemeDetail) {
    let color = tinycolor(currentThemeDetail[key]).setAlpha(Alpha[key]);
    newObj[key] = color.toRgbString();
  }
  newObj.topColor = tinycolor(currentThemeDetail.primaryColor)
    .setAlpha(0.98)
    .toString();
  let asideColor = tinycolor(newObj.primaryColor).darken(5);
  let headerColor = tinycolor(newObj.primaryColor).darken(8);
  newObj.asideColor = tinycolor(asideColor)
    .setAlpha(Alpha.primaryColor)
    .toRgbString();
  newObj.headerColor = tinycolor(headerColor)
    .setAlpha(Alpha.primaryColor)
    .toRgbString();
  return newObj;
};
export const getColorAlpha = (obj) => {
  let newObj = {};
  for (let key in obj) {
    let color = tinycolor(obj[key]);
    newObj[key] = color.getAlpha();
  }
  return newObj;
};
