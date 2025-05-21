import { createContext, useEffect, useState } from "react";
import toastify from "../components/Toast";
import { backgroundOptions } from "../utils/backgroundOptions";
import { localFontFamily, getInitLocalSupportedFont, webFontFamily } from "../utils/fontFamilyOptions";

const defaultBg = backgroundOptions[0]; // default sunflower bg

const SettingsContext = createContext({
  navbarPosition: { x: 50, y: 0 },
  setNavbarPosition: ({ x, y }) => {},
  whiteBoard: { width: 60, height: 50 }, // in percent
  setWhiteBoard: ({ width, height }) => {},
  fontSize: 15,
  serFontSize: (fontSize) => {},
  fontFamilyId: 'sans-serif',
  setFontFamilyId: (fontFamilyId) => {},
  localSupportedFonts: [],
  background: {id: defaultBg.id, path: defaultBg.path}, // default sunflower bg
  setBackground: (newBg) => {},
  settingsPanel: false,
  toggleSettingsPanel: () => {},
  setDefaultSettings: () => {},
});

export function SettingsProvider({ children }) {
  // 初始化函式們
  const getInitialNavbarPosition = () => {
    const stored = localStorage.getItem('navbar-position');
    return stored ? JSON.parse(stored) : { x: 50, y: 0 };
  };

  const getInitialWhiteBoard = () => {
    const stored = localStorage.getItem('whiteboard-size');
    return stored ? JSON.parse(stored) : { width: 60, height: 50 }; // in percent
  };

  const getInitialFontSize = () => {
    const stored = localStorage.getItem('font-size');
    return stored ? Number(stored) : 15;
  };

  // 初始化 字體大小在界面Ui顯示使用 style
  useEffect(() => {
    const initialFontSize = getInitialFontSize();
    document.documentElement.style.setProperty('--base-font-size', `${initialFontSize}px`);
  }, []);

  const getInitialBackground = () => {
    const storedId = localStorage.getItem('background-video');
    if (storedId) {
      const getBgPath = backgroundOptions.filter( i => i.id === storedId )[0].path;
      const bgPath = getBgPath ? getBgPath : defaultBg.id;
      const stored = { id: storedId, path: bgPath };
      return stored;
    }
    return { id: defaultBg.id, path: defaultBg.path }; // default background (sunflower bg)
  };

  const getInitialFontFamilyId = () => {
    const stored = localStorage.getItem('font-family');
    let parsed;
    try {
      parsed = JSON.parse(stored);
    } catch (e) {
      parsed = null;
    }

  
    if ( localSupportedFonts !== null ) {
      if (Array.isArray(parsed)) {
        // 是舊格式 (array)，要清掉
        localStorage.removeItem("font-family");
        return localSupportedFonts[0];
      } else if (!parsed) {
        return localSupportedFonts[0];
      } else {
        console.log("local storage", parsed);
        if ( checkFontsAvailable(parsed) ) {
          return parsed;
        } else {
          return localSupportedFonts[0];
        }
      }
    } else {
      console.log("找不到 localSupportFonts!");
    }
  }
  
  const checkFontsAvailable = (font) => {
    return (
      localSupportedFonts.includes(font) ||
      webFontFamily.some((f) => f.id === font)
    );
  };

  // 狀態設置
  const [navbarPosition, setNavbarPositionState] = useState(getInitialNavbarPosition);
  const [whiteBoard, setWhiteBoardState] = useState(getInitialWhiteBoard);
  const [fontSize, setShareserFontSizedData] = useState(getInitialFontSize);
  const [fontFamilyId, setFontFamilyId] = useState(null); // 初始為 null
  const [localSupportedFonts, setLocalSupportedFonts] = useState(null);
  const [background, setBackgroundState] = useState(getInitialBackground);
  const [settingsPanel, setSettingsPanel] = useState(false);

  useEffect(() => {
    const checkFonts = async () => {
      console.log("開始執行 checking local support 的 font family!!");
      const fonts = await getInitLocalSupportedFont();
      setLocalSupportedFonts(fonts);
    };
    
    checkFonts();
  }, []);

  useEffect(() => {
    console.log("local supported font: ", localSupportedFonts);
    const initFont = getInitialFontFamilyId(); // 改為普通函式
    setFontFamilyId(initFont);
    console.log("getInitFont:", initFont);
  }, [localSupportedFonts]); // 等 localSupportedFonts 有值後再初始化

  // 自動儲存到 localStorage
  useEffect(() => {
    localStorage.setItem('navbar-position', JSON.stringify(navbarPosition));
  }, [navbarPosition]);

  useEffect(() => {
    localStorage.setItem('whiteboard-size', JSON.stringify(whiteBoard));
  }, [whiteBoard]);

  useEffect(() => {
    localStorage.setItem('font-size', fontSize.toString());
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  if (fontFamilyId) {
        localStorage.setItem('font-family', JSON.stringify(fontFamilyId));
        let fontFamily;
        const localFontFind = localFontFamily.find(item => item.id === fontFamilyId);
        const cloudFontFind = webFontFamily.find(item => item.id === fontFamilyId);
        if (localFontFind) {
          fontFamily = localFontFind.fontFamily;
        } else if (cloudFontFind) {
          fontFamily = cloudFontFind.fontFamily;
        } else {
          console.log("找不到字體 font family!");
        }
        document.documentElement.style.setProperty('--g-font-family', fontFamily);
  }

  useEffect(() => {
    localStorage.setItem('background-video', background.id);
  }, [background]);

  // 當settingsPanel更新，更新 style UI
  useEffect(() => {
    const size = settingsPanel ? '30vw' : '0px';
    document.documentElement.style.setProperty('--settings-panel', size);
  }, [settingsPanel]);

  // 控制用函式們
  const setNavbarPosition = ({ x, y }) => {
    setNavbarPositionState({ x, y });
  };

  const setWhiteBoard = ({ width, height }) => {
    setWhiteBoardState({ width, height });
  };

  const serFontSize = (size) => {
    setShareserFontSizedData(size);
  };

  const setBackground = (newBgId) => {
    const bg = backgroundOptions.filter(i => i.id === newBgId);
    const bgPath = bg[0].path;
    setBackgroundState({ id: newBgId, path: bgPath });
  };

  const toggleSettingsPanel = () => {
    setSettingsPanel(prev => !prev);
  };

  const setDefaultSettings = () => {
    localStorage.removeItem("background-video");
    localStorage.removeItem("font-size");
    localStorage.removeItem("navbar-position");
    localStorage.removeItem("whiteboard-size");
    setNavbarPositionState({ x: 50, y: 0 });
    setWhiteBoardState({ width: 60, height: 50 }); // in percent
    setShareserFontSizedData(15);
    setBackgroundState({ id: defaultBg.id, path: defaultBg.path }); // default sunflower bg
    toastify("恢復預設設定", "info");
  };

  const context = {
    navbarPosition,
    setNavbarPosition,
    whiteBoard,
    setWhiteBoard,
    fontSize,
    serFontSize,
    fontFamilyId,
    setFontFamilyId,
    localSupportedFonts,
    background,
    setBackground,
    settingsPanel,
    toggleSettingsPanel,
    setDefaultSettings,
  };

  return (
    <SettingsContext.Provider value={context}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsContext;
