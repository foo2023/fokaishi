import { detectFont, supportedFonts } from 'detect-font';
import { doesFontExist } from './detectFont';
const element = document.querySelector('#root');
console.log(detectFont(element));
console.log(supportedFonts(element));

export const fontFamilyOptions = [
  {
    id: 'ChironGoRoundTCWS',
    fontFamily: '"Chiron GoRound TC WS"',
    title: "昭源環方",
    recommend: true,
  },
]

export const localFontFamily = [
  {
    id: 'KaiTi',
    fontFamily: 'KaiTi',
    title: '楷體',
    recommend: true,
  },
  {
    id: 'STKaiTi',
    fontFamily: 'STKaiTi',
    title: 'ST楷體',
    recommend: true,
  },
  {
    id: '"lisu"',
    fontFamily: '"lisu"',
    title: 'lisu',
    recommend: true,
  },
  {
    id: 'STFangsong',
    fontFamily: 'STFangsong',
    title: 'ST放鬆',
    recommend: true,
  },
  {
    id: 'FangSong',
    fontFamily: 'FangSong',
    title: '放鬆',
    recommend: true,
  },
  {
    id: 'FZShuTi',
    fontFamily: 'FZShuTi',
    title: 'FZ書體',
    recommend: false,
  },
  {
    id: 'PingFang',
    fontFamily: '"PingFang TC"',
    title: 'IOS字體',
    recommend: true,
  },
  {
    id: 'Heiti',
    fontFamily: '"Heiti TC"',
    title: '黑體',
    recommend: true,
  },
  {
    id: 'fontdefault',
    fontFamily: ['Arial', 'sans-serif'],
    title: '無襯線體',
    recommend: false,
  },
];

export async function initLocalSupportedFont() {
  const supportedFonts = [];

  for (const font of localFontFamily) {
    const exists = await doesFontExist(font.fontFamily);
    if (font.id === 'fontdefault') {
      supportedFonts.push('Arial');
    } else if (exists) {
      supportedFonts.push(font.fontFamily);
    }
  }

  return supportedFonts; // ['fangsong', 'Kaiti', ...]
}