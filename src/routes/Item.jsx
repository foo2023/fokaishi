import React, { useContext } from 'react';
import { useParams } from 'react-router';
import SharedContext from '../context/SharedContext';
import WhiteBoard from '../components/WhiteBoard';
import SideNav from '../components/SideNav';
import { usePageTitle } from '../utils/usePageTitle';
import { decodeHTMLEntities } from '../utils/decodeHTMLEntities';

const Item = () => {
  const ctx = useContext(SharedContext);
  const { id }  = useParams();
  const dataMatch = ctx.data.filter((item) => {
    return item.id === Math.floor(id);
  })[0]; 

  // 更新page 標題
  if (dataMatch) {
    usePageTitle(
      decodeHTMLEntities(
        dataMatch.title.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ')
      )
    );
  } else {
    usePageTitle("找不到項目！");
  }
  

  return (
    <div className="w-full md:w-[calc(100%-var(--settings-panel))] h-full flex items-center justify-center">
      
      {dataMatch ? (
        <>
          <WhiteBoard title={dataMatch.title} description={dataMatch.description} />
          <SideNav id={id} />
        </>
        
      ) : (
        <h1 className="text-xl text-red-500">抱歉 找不到此項目</h1>
      )}
    </div>
  );
}

export default Item
