import React, { useContext, useEffect, useState } from 'react'
import SharedContext from '../context/SharedContext';
import { Link } from 'react-router';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';

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
        <button className='rounded-full p-1 hover:p-2 bg-white/30 hover:bg-white/70 hover:text-stone-700 hover:-ml-2.5 cursor-pointer shadow-md z-20 transition-all duration-100 animate-[bounceLeft_2s_infinite]'>
          <Link to={`/${navIds.prev}`}>
            <FaCaretLeft className='size-6'/>
          </Link>  
        </button>
        
      ) : <div />} {/* 保持佔位使左右對齊 */}

      {navIds.next ? (
        <button className='rounded-full p-1 hover:p-2 bg-white/30 hover:bg-white/70 hover:text-stone-700 hover:-mr-2.5 cursor-pointer shadow-md z-20 transition-all duration-100 animate-[bounceRight_2s_infinite]'>
          <Link to={`/${navIds.next}`}>
            <FaCaretRight className='size-6'/>
          </Link>
        </button>
      ) : <div />}
    </div>
  );
};


export default SideNav
