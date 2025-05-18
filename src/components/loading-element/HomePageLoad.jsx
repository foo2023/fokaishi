import React from 'react';

const HomePageLoad = () => {
  return (
    <div className='md:w-[calc(100%-var(--settings-panel))] w-full h-full overflow-scroll'>
      <div className='relative max-w-[1070px] mx-auto px-2.5 mt-6'>
          <ul className='grid'>
            {[...Array(3)].map((_, index) => (
              <li key={index} className='my-2 w-full h-28 mx-1 md:mx-4 rounded-md animate-pulse bg-gray-200 overflow-hidden'>
                <div className='relative flex items-center'>
                  {/* 图片方块 */}
                  <div className='w-[30%] md:w-44 md:h-28 relative pointer-events-none animate-pulse bg-gray-400' />
                  {/* 文字方块 */}
                  <div className='w-[80%] mx-4 h-8 animate-pulse bg-gray-400 my-1.5 rounded-md'/>
                </div>
              </li>
            ))}
          </ul>
      </div>
    </div>
  )
}

export default HomePageLoad
