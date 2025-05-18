
import React, { useContext, useEffect, useRef, useState } from 'react'
import SettingsContext from '../context/SettingsContext';

const MovableNavItems = ({ children }) => {
  const settingsCtx = useContext(SettingsContext);

  /* 能夠移動的左側Navigation Item */
  const containerBox = useRef(null);
  const dragableItem = useRef(null);

  const isClicked = useRef(false);
  const [wasDragged, setWasDragged] = useState(false); // << 新增

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
      setWasDragged(false); // << 設置防止直接拖拉
      coord.current.startX = e.clientX;
      coord.current.startY = e.clientY;
    };

    const onTouchStart = (e) => {
      isClicked.current = true;
      setWasDragged(false); // << 設置防止直接拖拉
      coord.current.startX = e.touches[0].clientX;
      coord.current.startY = e.touches[0].clientY;
    };

    const onTouchEnd = (e) => {
      isClicked.current = false;
      setWasDragged(false); // remain wasDragges back to false
      
      if (wasDragged) {
        e.preventDefault(); // << 防止點擊行為
        e.stopPropagation(); // << 可選：阻止冒泡以防影響子元件
      }
  
      // 計算百分比位置
      const percentX = (dragable.offsetLeft / container.offsetWidth) * 100;
      const percentY = (dragable.offsetTop / container.offsetHeight) * 100;
  
      coord.current.lastXPercent = percentX;
      coord.current.lastYPercent = percentY;
  
      // 儲存百分比位置
      settingsCtx.setNavbarPosition({ x: percentX, y: percentY })
    };
  
    const onMouseUp = (e) => {
      if (isClicked.current) {
        isClicked.current = false;
        setWasDragged(false); // remain wasDragges back to false
        
        if (wasDragged) {
          e.preventDefault(); // << 防止點擊行為
          e.stopPropagation(); // << 可選：阻止冒泡以防影響子元件
        }
    
        // 計算百分比位置
        const percentX = (dragable.offsetLeft / container.offsetWidth) * 100;
        const percentY = (dragable.offsetTop / container.offsetHeight) * 100;
    
        coord.current.lastXPercent = percentX;
        coord.current.lastYPercent = percentY;
    
        // 儲存百分比位置
        settingsCtx.setNavbarPosition({ x: percentX, y: percentY })
      }
    };
  
    const onMouseMove = (e) => {
      if (!isClicked.current) return;

      const moveX = Math.abs(e.clientX - coord.current.startX);
      const moveY = Math.abs(e.clientY - coord.current.startY);

      if ( isClicked && (moveX > 5 || moveY > 5)) {
        setWasDragged(true); // << 若移動超過5px，才視為拖拉
      }
  
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

    function onTouchMove(e) {
      const moveX = Math.abs(e.touches[0].clientX - coord.current.startX);
      const moveY = Math.abs(e.touches[0].clientY - coord.current.startY);

      if ( isClicked && (moveX > 5 || moveY > 5)) {
        setWasDragged(true); // << 若移動超過5px，才視為拖拉
      }
  
      const containerWidth = container.offsetWidth;
      const containerHeight = container.offsetHeight;
  
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
  
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
    }
  
    dragable.addEventListener('mousedown', onMouseDown);
    dragable.addEventListener('touchstart', onTouchStart);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd);
    container.addEventListener('mousemove', onMouseMove);
    dragable.addEventListener('touchmove', onTouchMove);
  
    if (settingsCtx.navbarPosition) {
      const { x, y } = settingsCtx.navbarPosition;
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
      dragable.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
      container.removeEventListener('mousemove', onMouseMove);
      dragable.removeEventListener('touchmove', onTouchMove);
    };
  }, []);

  return (
    <div ref={containerBox} className={`${outOfLimit ? 'out-limit': ''} grow relative  max-w-full overflow-visible`}>
      {/* drag遮罩 (只在拖拉時顯示) */}
      {wasDragged && (
        <div className={`pointer-events-auto absolute inset-0 z-20 bg-white/30 ${wasDragged ? 'dragging': ''}`} />
      )}
        {/* dragable item */}
      <div
        ref={dragableItem}
        style={{ position: 'relative', top: '0px', left: '0px', }}
        className='flex items-center w-fit bg-amber-100/50 backdrop-blur-md p-2 rounded-xl shadow-xl pointer-events-auto'
      >{children}</div>
    </div>
  )
}

export default MovableNavItems
