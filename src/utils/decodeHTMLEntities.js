/*
* FUNCTION: decodeHTMLEntities
* IMPORT: str (String)
* EXPORT: (String)
* 用途: 将传入进来的 HTML string 转换成不包含 HTML syntax 的 string
*/
export function decodeHTMLEntities(str) {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
}