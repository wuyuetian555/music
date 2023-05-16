const tinycolor = require('tinycolor2');
export const changeStyle = (obj) => {
  const root = document.querySelector(':root');
  for (const key in obj) {
    root.style.setProperty(`--${key}`, obj[key]);
  }
};

export const getHexString = (obj) => {
  const newObj = {};
  for (const key in obj) {
    const color = tinycolor(obj[key]);
    newObj[key] = color.toHexString();
  }
  return newObj;
};

export const getRgba = ({ currentThemeDetail, Alpha }) => {
  const newObj = {};
  for (const key in currentThemeDetail) {
    const color = tinycolor(currentThemeDetail[key]).setAlpha(Alpha[key]);
    newObj[key] = color.toRgbString();
  }
  newObj.topColor = tinycolor(currentThemeDetail.primaryColor).toString();
  const asideColor = tinycolor(newObj.primaryColor).darken(5);
  const headerColor = tinycolor(newObj.primaryColor).darken(8);
  newObj.asideColor = tinycolor(asideColor)
    .setAlpha(Alpha.primaryColor)
    .toRgbString();
  newObj.headerColor = tinycolor(headerColor)
    .setAlpha(Alpha.primaryColor)
    .toRgbString();
  return newObj;
};
export const getColorAlpha = (obj) => {
  const newObj = {};
  for (const key in obj) {
    const color = tinycolor(obj[key]);
    newObj[key] = color.getAlpha();
  }
  return newObj;
};
