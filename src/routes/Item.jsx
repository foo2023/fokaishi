import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import SharedContext from '../context/SharedContext';
import WhiteBoard from '../components/WhiteBoard';
import SideNav from '../components/SideNav';
import { usePageTitle } from '../utils/usePageTitle';

const Item = () => {
  const ctx = useContext(SharedContext);
  const { id }  = useParams();
  const dataMatch = ctx.data.filter((item) => {
      return item.id === Math.floor(id);
    });

  // 更新page 標題
  function decodeHTMLEntities(str) {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  }
  
  usePageTitle(
    decodeHTMLEntities(
      dataMatch[0].title.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ')
    )
  );

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
