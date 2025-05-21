import isElement from 'is-element';

/* 
* 用途: 这是一个检查 user local support 的字体
* 来源: npm i detect-font (经过修改适用中文字体检查)
*/

/**
 * @constant DEFAULT_OPTIONS
 * @type {Object}
 */
const DEFAULT_OPTIONS = {
  text: '測試中文字體漢字繁體測試字型例子',
  fontSize: 72,
  baseFont: 'monospace'
};

const BASE_FONTS = ['sans-serif', 'serif', 'monospace'];

const removeQuotes = name => {
  const matches = String(name).match(/^["']?(.+?)["']?$/i);
  return Array.isArray(matches) ? matches[1] : '';
};

const throwException = message => {
  throw new Error(`DetectFont: ${message}.`);
};

const assertText = text => {
  text === '' && throwException('Text cannot be empty.');
};

const assertFontSize = fontSize => {
  fontSize === 0 && throwException('Font size must be greater than zero.');
};

export const detectFont = (element, options = DEFAULT_OPTIONS) => {
  if (!isElement(element)) {
    return void throwException('Target is not a DOM element.');
  }
  return supportedFonts(element, options)[0] || false;
};

export const supportedFonts = (element, options = DEFAULT_OPTIONS) => {
  if (!isElement(element)) {
    return [];
  }

  const opts = { ...DEFAULT_OPTIONS, ...options };
  assertText(opts.text);
  assertFontSize(opts.fontSize);

  const properties = window.getComputedStyle(element);
  const fontFamily = properties.getPropertyValue('font-family') || element.style.fontFamily || 'serif';
  const fonts = fontFamily.split(',');

  const canvas = document.createElement('canvas');
  canvas.width = 500;
  canvas.height = 200;
  const context = canvas.getContext('2d');

  return fonts.map(font => font.trim())
    .map(removeQuotes)
    .map(fontName => {
      if (BASE_FONTS.includes(fontName.toLowerCase())) return fontName;

      context.font = `${opts.fontSize}px ${opts.baseFont}`;
      const baseline = context.measureText(opts.text).width;

      context.font = `${opts.fontSize}px '${fontName}', ${opts.baseFont}`;
      const testWidth = context.measureText(opts.text).width;

      return baseline !== testWidth ? fontName : false;
    })
    .filter(Boolean);
};


/*
* FUNCTION: isFontExist
* IMPORT: fontName (String)
* EXPORT: (boolean)
* 用途: 先传入一个字体名称，然后进行检查是否可用
*/
export async function isFontExist(fontName) {
  await document.fonts.ready; // 等字體載入完
  // creating our in-memory Canvas element where the magic happens
  
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  // [修正] 設定 canvas 大小，避免縮放問題
  canvas.width = 500;
  canvas.height = 200;
  canvas.style.width = "500px";
  canvas.style.height = "200px";

  // the text whose final pixel size I want to measure
  var text = "阿彌陀佛您好嗎？？？？？！！！！！cewrfrwnjckesncjsnj";

  // specifying the baseline font
  context.font = "72px Arial";

  // checking the size of the baseline text
  var baselineSize = context.measureText(text).width;

  // specifying the font whose existence we want to check
  context.font = "72px '" + fontName + "', Arial";

  // checking the size of the font we want to check
  var newSize = context.measureText(text).width;

  // removing the Canvas element we created
  // canvas = null;

  console.log(fontName , ": base: ", baselineSize, " new: ", newSize);

  //
  // If the size of the two text instances is the same, the font does not exist because it is being rendered
  // using the default sans-serif font
  //
  if (newSize === baselineSize) {
      return false;
  } else {
      return true;
  }
}