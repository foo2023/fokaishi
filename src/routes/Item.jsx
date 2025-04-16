import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import SharedContext from '../context/SharedContext';
import WhiteBoard from '../components/WhiteBoard';
import SideNav from '../components/SideNav';

const Item = () => {
  let data = [
    {
      id: 1,
      title: "",
      p: ``,
    },
    {
      id: 2,
      title: "阿彌陀佛",
      p: ``,
    }
  ]
  const ctx = useContext(SharedContext);
  const { id }  = useParams();
  const dataMatch = ctx.data.filter((item) => {
      return item.id === Math.floor(id);
    })

  return (
    <div className="fixed w-screen h-dvh flex items-center justify-center top-0">
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
