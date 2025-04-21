import { createContext, useEffect, useState } from "react";
import toastify from "../components/Toast";

const SettingsContext = createContext({
  navbarPosition: { x: 50, y: 0 },
  setNavbarPosition: ({ x, y }) => {},
  whiteBoard: { width: 800, height: 500 },
  setWhiteBoard: ({ width, height }) => {},
  fontSize: 15,
  serFontSize: (fontSize) => {},
  background: 'bg/sunflower_bg_vid.mp4',
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
    return stored ? JSON.parse(stored) : { width: 800, height: 500 };
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
    const stored = localStorage.getItem('background-video');
    return stored ? stored : 'bg/sunflower_bg_vid.mp4';
  };

  // 狀態設置
  const [navbarPosition, setNavbarPositionState] = useState(getInitialNavbarPosition);
  const [whiteBoard, setWhiteBoardState] = useState(getInitialWhiteBoard);
  const [fontSize, setShareserFontSizedData] = useState(getInitialFontSize);
  const [background, setBackgroundState] = useState(getInitialBackground);
  const [settingsPanel, setSettingsPanel] = useState(false);

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

  useEffect(() => {
    localStorage.setItem('background-video', background);
  }, [background]);

  // 當settingsPanel更新，更新 style UI
  useEffect(() => {
    const size = settingsPanel ? '25vw' : '0px';
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

  const setBackground = (newBg) => {
    setBackgroundState(newBg);
  };

  const toggleSettingsPanel = () => {
    setSettingsPanel(prev => !prev);
  };

  const setDefaultSettings = () => {
    localStorage.clear();
    setNavbarPositionState({ x: 50, y: 0 });
    setWhiteBoardState({ width: 800, height: 500 });
    setShareserFontSizedData(15);
    setBackgroundState('bg/sunflower_bg_vid.mp4');
    toastify("恢復預設設定", "info");
  };

  const context = {
    navbarPosition,
    setNavbarPosition,
    whiteBoard,
    setWhiteBoard,
    fontSize,
    serFontSize,
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
