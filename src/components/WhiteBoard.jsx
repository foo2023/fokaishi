import React, { useContext, useEffect, useRef, useState } from 'react';
import SettingsContext from '../context/SettingsContext';

const WhiteBoard = ({title, description}) => {
  const settingsCtx = useContext(SettingsContext);

  /* 白板功能 */
  const whiteboardRef = useRef(null);

  const [isResizing, setIsResizing] = useState(false);

  const MAX_WIDTH = 98;
  const MAX_HEIGHT = 98;
  const MIN_WIDTH = 40;
  const MIN_HEIGHT = 30;

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isResizing) {
        const rect = whiteboardRef.current.getBoundingClientRect();
        const checkX = ((e.clientX - rect.left) / document.documentElement.clientWidth) * 100;
        const checkY = ((e.clientY - rect.top) / document.documentElement.clientHeight) * 100;
        const finalX = Math.min(Math.max(checkX, MIN_WIDTH), MAX_WIDTH);
        const finalY = Math.min(Math.max(checkY, MIN_HEIGHT), MAX_HEIGHT);

        settingsCtx.setWhiteBoard({
          width: finalX,
          height: finalY,
        });
      }
    };

    const handleMouseUp = () => setIsResizing(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);
  return (
    <div
      ref={whiteboardRef}
      className="cursor-pointer bg-white/70 backdrop-blur-md rounded-xl shadow-xl border border-gray-200 relative z-10"
      style={{ width: `${settingsCtx.whiteBoard.width}%`, height: `${settingsCtx.whiteBoard.height}%` }}
    >
      <div className='overflow-auto [width:inherit] [height:inherit]'>
        <div className="grid justify-center font-bold" dangerouslySetInnerHTML={{ __html: title }} />
        <div
          className="p-6 text-gray-800 text-base leading-relaxed whitespace-pre-wrap"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
      

      {/* 拖拉調整大小的小角落 */}
      <div
        className="absolute right-0 bottom-0 w-5 h-5 bg-transparent cursor-nwse-resize"
        onMouseDown={() => setIsResizing(true)}
      >
        <div className="w-full h-full border-r-2 border-b-2 border-gray-400 rounded-sm"></div>
      </div>
    </div>
  )
}

export default WhiteBoard
