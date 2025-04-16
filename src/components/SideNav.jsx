import React, { useContext, useEffect, useState } from 'react'
import SharedContext from '../context/SharedContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const SideNav = ({ id }) => {
  const ctx = useContext(SharedContext);
  const [navIds, setNavIds] = useState({ prev: null, next: null });

  useEffect(() => {
    const { prev, next } = ctx.getNavItemId(id);
    setNavIds({ prev, next });
  }, [id, ctx]);

  return (
    <div className="flex justify-between items-center w-full mt-4 px-4 absolute">
      {navIds.prev ? (
        <button className='rounded-full p-2 bg-white hover:text-stone-700 cursor-pointer mr-2.5 shadow-md z-20'>
          <Link to={`/${navIds.prev}`}>
            <FaArrowLeft className='size-6'/>
          </Link>  
        </button>
        
      ) : <div />} {/* 保持佔位使左右對齊 */}

      {navIds.next ? (
        <button className='rounded-full p-2 bg-white hover:text-stone-700 cursor-pointer mr-2.5 shadow-md z-20'>
          <Link to={`/${navIds.next}`}>
            <FaArrowRight className='size-6'/>
          </Link>
        </button>
      ) : <div />}
    </div>
  );
};


export default SideNav
