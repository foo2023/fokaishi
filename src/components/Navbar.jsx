import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaHome, FaRegPlusSquare } from "react-icons/fa";
import SharedContext from '../context/SharedContext';
import { MdTextIncrease, MdTextDecrease, MdFullscreen, MdFullscreenExit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

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
      tag: '字+',
      icon: MdTextIncrease,
      onClick: () => setFontSize(prev => prev + 5),
    },
    {
      tag: '字-',
      icon: MdTextDecrease,
      onClick: () => setFontSize(prev => prev - 5),
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

  /* 能夠移動的左側Navigation Item */
  const containerBox = useRef(null);
  const dragableItem = useRef(null);

  const isClicked = useRef(false);

  const coord = useRef({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  const [outOfLimit, setOutOfLimit] = useState(false);

  useEffect(() => {
    if (!containerBox.current || !dragableItem.current) return;
  
    const container = containerBox.current;
    const dragable = dragableItem.current;
  
    const onMouseDown = (e) => {
      isClicked.current = true;
      coord.current.startX = e.clientX;
      coord.current.startY = e.clientY;
    };
  
    const onMouseUp = () => {
      isClicked.current = false;
  
      // 計算百分比位置
      const percentX = (dragable.offsetLeft / container.offsetWidth) * 100;
      const percentY = (dragable.offsetTop / container.offsetHeight) * 100;
  
      coord.current.lastXPercent = percentX;
      coord.current.lastYPercent = percentY;
  
      // 儲存百分比位置
      localStorage.setItem(
        'navbar-drag-position',
        JSON.stringify({ x: percentX, y: percentY })
      );
    };
  
    const onMouseMove = (e) => {
      if (!isClicked.current) return;
  
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
  
      const currentX = e.clientX;
      const currentY = e.clientY;
  
      const deltaX = currentX - coord.current.startX;
      const deltaY = currentY - coord.current.startY;
  
      const lastX = (coord.current.lastXPercent || 0) * containerWidth / 100;
      const lastY = (coord.current.lastYPercent || 0) * containerHeight / 100;
  
      const nextX = lastX + deltaX;
      const nextY = lastY + deltaY;
  
      const maxX = containerWidth - dragable.offsetWidth;
      const maxY = containerHeight - dragable.offsetHeight;
  
      const boundedX = Math.max(0, Math.min(nextX, maxX));
      const boundedY = Math.max(0, Math.min(nextY, maxY));
  
      dragable.style.left = `${(boundedX / containerWidth) * 100}%`;
      dragable.style.top = `${(boundedY / containerHeight) * 100}%`;
  
      if (nextY > maxY || nextX > maxX) {
        setOutOfLimit(true);
      } else {
        setOutOfLimit(false);
      }
    };
  
    dragable.addEventListener('mousedown', onMouseDown);
    dragable.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
  
    const saved = localStorage.getItem('navbar-drag-position');
    if (saved) {
      const { x, y } = JSON.parse(saved);
      coord.current.lastXPercent = x;
      coord.current.lastYPercent = y;
      // 等 DOM 完成後還原位置
      setTimeout(() => {
        dragable.style.left = `${x}%`;
        dragable.style.top = `${y}%`;
      }, 0);
    }
  
    return () => {
      dragable.removeEventListener('mousedown', onMouseDown);
      dragable.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className={`relative z-10 w-full mx-auto p-3.5 flex`}>
      {/* 左邊按鈕 */}
      <div ref={containerBox} className={`${outOfLimit ? 'out-limit': ''} grow relative`}>
        {/* dragable item */}
        <div
          ref={dragableItem}
          style={{ position: 'absolute', top: '0px', left: '0px', }}
          className={!isFullScreen ? 'flex items-center' : 'hidden'}
        >
          {optionsLeft.map(({ tag, icon: Icon, onClick }, index) => (
            <button
              key={index}
              title={tag}
              className='rounded-md p-2 bg-white hover:text-stone-700 cursor-pointer mr-2.5 shadow-md'
              onClick={onClick}
            >
              <Icon className='size-6' />
            </button>
          ))}
          <button title={'字體大小: ' + fontSize} className='rounded-md p-2 bg-white hover:text-stone-700 cursor-pointer mr-2.5 shadow-md'>字號：{fontSize}</button>
        </div>
      </div>

      {/* 右邊按鈕 */}
      <div className='flex items-center'>
        {optionsRight.map(({ tag, icon: Icon, onClick, show }, index) =>
          show ? (
            <button
              key={index}
              title={tag}
              className='rounded-md p-2 bg-white hover:text-stone-700 cursor-pointer mr-2.5 shadow-md'
              onClick={onClick}
            >
              <Icon className={!isFullScreen ? 'size-6' : 'size-9'} />
            </button>
          ) : null
        )}
      </div>
    </div>
  );
};

export default Navbar;
