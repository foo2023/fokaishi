import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaHome, FaRegPlusSquare } from "react-icons/fa";
import SharedContext from '../context/SharedContext';
import { MdTextIncrease, MdTextDecrease, MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import MovableNavItems from './MovableNavItems';
import { FiSettings } from 'react-icons/fi';
import SettingsContext from '../context/SettingsContext';

const Navbar = () => {
  /* 全屏狀態追蹤 */
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  /* context api */
  const ctx = useContext(SharedContext);
  const settingsCtx = useContext(SettingsContext);

  /* 全局字體大小 */
  const [fontSize, setFontSize] = useState(15);
  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  const navigate = useNavigate();
  
  /* 左邊導航物件 */
  const optionsLeft = [
    {
      tag: '首頁',
      icon: FaHome,
      onClick: () => {
        
        navigate('..');
      },
    },
    {
      tag: '創建',
      icon: FaRegPlusSquare,
      onClick: ctx.toggleDisplayCreateForm,
    },
    {
      tag: '設置',
      icon: FiSettings,
      onClick: settingsCtx.toggleSettingsPanel,
    },
  ];

  /* 右側導航物件 */
  const optionsRight = [
    {
      tag: '全屏',
      icon: MdFullscreen,
      onClick: () => {
        const element = document.documentElement;
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      },
      show: !isFullScreen,
    },
    {
      tag: '退出全屏',
      icon: MdFullscreenExit,
      onClick: () => {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      },
      show: isFullScreen,
    },
  ];

  

  return (
    <div className={`relative z-10 w-full mx-auto p-3.5 flex`}>
      {/* 左邊按鈕 */}
      <MovableNavItems isFullScreen={isFullScreen}>
          {optionsLeft.map(({ tag, icon: Icon, onClick }, index) => (
            <button
              key={index}
              title={tag}
              className='hover:text-stone-700 cursor-pointer mr-2'
              onClick={onClick}
            >
              <Icon className='size-6' />
            </button>
          ))}
          {optionsRight.map(({ tag, icon: Icon, onClick, show }, index) =>
            show ? (
              <button
                key={index}
                title={tag}
                className='hover:text-stone-700 cursor-pointer mr-2'
                onClick={onClick}
              >
                <Icon className='size-6' />
              </button>
            ) : null
          )}
      </MovableNavItems>

      {/* 右邊按鈕 */}
      <div className='flex items-center'>
        
      </div>
    </div>
  );
};

export default Navbar;
