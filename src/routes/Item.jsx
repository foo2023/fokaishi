import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SharedContext from '../context/SharedContext';
import WhiteBoard from '../components/WhiteBoard';
import SideNav from '../components/SideNav';
import SettingsContext from '../context/SettingsContext';

const Item = () => {
  const ctx = useContext(SharedContext);
  const settingsCtx = useContext(SettingsContext);
  const { id }  = useParams();
  const dataMatch = ctx.data.filter((item) => {
      return item.id === Math.floor(id);
    })

  return (
    <div className="w-full md:w-[calc(100%-var(--settings-panel))] h-full fixed flex items-center justify-center top-0">
      {dataMatch[0] ? (
        <>
          <WhiteBoard title={dataMatch[0].title} description={dataMatch[0].description} />
          <SideNav id={id} />
        </>
        
      ) : (
        <h1 className="text-xl text-red-500">抱歉 找不到此項目</h1>
      )}
    </div>
  );
}

export default Item
