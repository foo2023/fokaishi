
import React, { useEffect, useRef, useState } from 'react'

const MovableNavItems = ({ isFullScreen, children }) => {
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
  
    const onMouseUp = (e) => {
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
      localStorage.setItem(
        'navbar-drag-position',
        JSON.stringify({ x: percentX, y: percentY })
      );
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
  
    dragable.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
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
      window.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div ref={containerBox} className={`${outOfLimit ? 'out-limit': ''} grow relative`}>
      {/* drag遮罩 (只在拖拉時顯示) */}
      {wasDragged && (
        <div className={`absolute inset-0 z-20 backdrop-blur-sm bg-white/30 ${wasDragged ? 'dragging': ''}`} />
      )}
        {/* dragable item */}
      <div
        ref={dragableItem}
        style={{ position: 'absolute', top: '0px', left: '0px', }}
        className={!isFullScreen ? 'flex items-center' : 'hidden'}
      >{children}</div>
    </div>
  )
}

export default MovableNavItems
