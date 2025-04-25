import React from 'react';

const HomePageLoad = () => {
  return (
    <div className='md:w-[calc(100%-var(--settings-panel))] w-full h-full overflow-scroll'>
      <div className='relative max-w-[1070px] mx-auto px-2.5 mt-6'>
          <ul className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5'>
              <li className='my-2 w-full h-[250px] mx-1 md:mx-4 rounded-md animate-pulse bg-gray-200 overflow-hidden'>
                <div className='relative'>
                  <div className='h-[200px] relative pointer-events-none animate-pulse bg-gray-400'>
                  </div>
                  <div className='w-[85%] h-8 animate-pulse bg-gray-400 mx-auto my-1.5 rounded-md'/>
                </div>
              </li>
              <li className='my-2 w-full h-[250px] mx-1 md:mx-4 rounded-md animate-pulse bg-gray-200 overflow-hidden'>
                <div className='relative'>
                  <div className='h-[200px] relative pointer-events-none animate-pulse bg-gray-400'>
                  </div>
                  <div className='w-[85%] h-8 animate-pulse bg-gray-400 mx-auto my-1.5 rounded-md'/>
                </div>
              </li>
              <li className='my-2 w-full h-[250px] mx-1 md:mx-4 rounded-md animate-pulse bg-gray-200 overflow-hidden'>
                <div className='relative'>
                  <div className='h-[200px] relative pointer-events-none animate-pulse bg-gray-400'>
                  </div>
                  <div className='w-[85%] h-8 animate-pulse bg-gray-400 mx-auto my-1.5 rounded-md'/>
                </div>
              </li>
          </ul>
      </div>
    </div>
  )
}

export default HomePageLoad
