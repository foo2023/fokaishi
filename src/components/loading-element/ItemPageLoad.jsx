import React from 'react'

const ItemPageLoad = () => {
  return (
    <div className="w-full h-full fixed flex items-center justify-center top-0">
      <div
        className="w-[80%] h-[80%] cursor-pointer bg-gray-200 rounded-xl animate-pulse border-gray-200 relative"
      >
        <div className='animate-pulse bg-gray-400 w-[60%] h-10 mx-auto my-6 rounded-md' />
        <div className='animate-pulse bg-gray-400 w-[45%] h-6 mx-auto my-2.5 rounded-md' />
        <div className='animate-pulse bg-gray-400 w-[45%] h-6 mx-auto my-2.5 rounded-md' />
        <div className='animate-pulse bg-gray-400 w-[45%] h-6 mx-auto my-2.5 rounded-md' />
      </div>
    </div>
  )
}

export default ItemPageLoad
