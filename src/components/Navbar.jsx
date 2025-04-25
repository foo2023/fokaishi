import React, { useContext, useEffect, useState } from 'react';
import SharedContext from '../context/SharedContext';
import { useLocation, useNavigate } from 'react-router';
import MovableNavItems from './MovableNavItems';
import SettingsContext from '../context/SettingsContext';
import { FaHouse, FaExpand, FaCompress, FaGear, FaSquarePlus } from 'react-icons/fa6';

const Navbar = () => {
  /* 全屏狀態追蹤 */
  const [isFullScreen, setIsFullScreen] = useState(false);

  // 獲取用戶當前所在頁面的path
  const location = useLocation();
  const { hash, pathname, search } = location;
  console.log(pathname);

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

  const homePageToggle = () => {
    if (pathname === '/') {
      return true
    } else {
      return false;
    }
  }
  
  /* 左邊導航物件 */
  const optionsLeft = [
    {
      tag: '首頁',
      icon: FaHouse,
      onClick: () => {
        
        navigate('..');
      },
      show: true,
      toggle: homePageToggle(),
    },
    {
      tag: '創建',
      icon: FaSquarePlus,
      onClick: ctx.toggleDisplayCreateForm,
      show: true,
      toggle: ctx.displayCreateForm,
    },
    {
      tag: '設置',
      icon: FaGear,
      onClick: settingsCtx.toggleSettingsPanel,
      show: true,
      toggle: settingsCtx.settingsPanel,
    },
    {
      tag: '全屏',
      icon: FaExpand,
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
      toggle: false,
    },
    {
      tag: '退出全屏',
      icon: FaCompress,
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
      toggle: true,
    },
  ];  

  console.log(optionsLeft[0].toggle);

  return (
    <div className={`relative z-10 w-full mx-auto p-3.5 flex pointer-events-none`}>
      <MovableNavItems isFullScreen={isFullScreen}>
        {optionsLeft.map(({ tag, icon: Icon, onClick, show, toggle }, index) => (
            show && (
              <button
                key={index}
                title={tag}
                className={`${toggle ? 'text-red-300 hover:text-red-400 animate-[bounceUp_2s_infinite]' : 'hover:text-stone-700' } cursor-pointer mr-2`}
                onClick={onClick}
              >
                <Icon className='size-6' strokeWidth={toggle ? 20 : 0} stroke="red" size={20} fill='currentColor' />
              </button>
            )
        ))}
      </MovableNavItems>
    </div>
  );
};

export default Navbar;
