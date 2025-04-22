import React, { useContext } from 'react'
import SharedContext from '../context/SharedContext';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from "react-icons/md";

const HomePage = () => {
  const ctx = useContext(SharedContext);

  return (
    <div className='md:w-[calc(100%-var(--settings-panel))] w-full h-full overflow-scroll'>
      {/* <video src="sunflower_bg_vid.mp4" className='object-cover w-[100vw] h-[100vh] fixed top-0 left-0 ' autoPlay loop muted>
        <source src="sunflower_bg_vid.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video> */}
      
      <div className='relative z-10 max-w-[1070px] mx-auto px-2.5 mt-6 '>
        {ctx.data.length > 0 ? (
          <ul className='grid grid-cols-3 gap-7'>
            {ctx.data.map((i) => {
              let dateTime;
              let labelDateTime;
              let is3DaysBefore = false;
              if (i.dateTime) {
                dateTime = new Date(i.dateTime);
                const now = new Date();
                const diffMs = now - dateTime;
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                const diffHours = Math.floor(diffMs / (1000 * 60 * 24));

                if (diffDays === 0) {
                  labelDateTime = `${diffHours}小時前`;
                  is3DaysBefore = true;
                } else if (diffDays < 4) {
                  // 幾天前顯示
                  labelDateTime = `${diffDays}天前`;
                  is3DaysBefore = true;
                } else {
                  // 超過或等於4天就顯示時間
                  labelDateTime = dateTime.toLocaleString(); // 根據使用者地區格式化
                }
              } else {
                labelDateTime = null;
              }
              return (
                <li key={i.id}>
                  <div className='group cursor mx-4 bg-amber-50/30 backdrop-blur-md pb-2 rounded-md drop-shadow-md overflow-hidden duration-200 hover:-translate-y-4'>
                      <button
                        title='刪除'
                        className={`bg-red-100 text-red-400 p-2 rounded-4xl mx-0.5 opacity-0 group-hover:opacity-100 transition-all duration-200 delay-200 cursor-pointer absolute z-20 hover:translate-y-1 hover:bg-red-200 hover:text-red-500`}
                        onClick={() => {
                          ctx.removeData(i.id);
                        }}
                      >
                        <MdDelete />
                      </button>                      
                    <div>
                      <Link to={`/${i.id}`} className="absolute h-full w-full z-10"/>
                      <div className='overflow-hidden h-[200px] relative'>
                        <img className="group-hover:scale-110 h-full w-full object-cover duration-200 relative" src={i.randomCover || '/random_cover/0.jpg'}/>
                        {i.dateTime && 
                          <div className={`${is3DaysBefore ? "bg-amber-500/60 text-white" : "bg-purple-600/60 text-white"} p-2 rounded-md absolute bottom-[5%] right-[10%] backdrop-blur-md`}>
                            {labelDateTime}
                          </div>
                        }
                      </div>
                      <div>
                        <div className="group-hover:text-stone-700 mx-3 font-bold" dangerouslySetInnerHTML={{ __html: i.title }} />
                      </div>
                    </div>
                  </div>
                  
                </li>
              )
            })}
          </ul>
        ) : (
          <div className='bg-white/50 backdrop-blur-md rounded-md p-5 m-auto grid items-center'><h2 className='text-center font-bold'>還沒有任何項目，請創建一個吧~ </h2><button className='cursor-pointer p-3.5 rounded-md bg-stone-200 hover:bg-stone-300' onClick={ctx.toggleDisplayCreateForm}><p>創建一個</p></button></div>
        )}
      </div>
        
    </div>
    
  )
}

export default HomePage
