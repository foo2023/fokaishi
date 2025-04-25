import React, { useContext, useMemo } from 'react';
import SharedContext from '../context/SharedContext';
import { Link } from 'react-router';
import { MdDelete } from "react-icons/md";

const HomePage = () => {
  const ctx = useContext(SharedContext);

  const parsedData = useMemo(() => {
    const now = new Date();
    return ctx.data.map(i => {
      let labelDateTime = null;
      let is3DaysBefore = false;

      if (i.dateTime) {
        const dateTime = new Date(i.dateTime);
        const diffMs = now - dateTime;
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffDays === 0) {
          labelDateTime = `${diffHours}小時前`;
          is3DaysBefore = true;
        } else if (diffDays < 4) {
          labelDateTime = `${diffDays}天前`;
          is3DaysBefore = true;
        } else {
          labelDateTime = dateTime.toLocaleString();
        }
      }

      return { ...i, labelDateTime, is3DaysBefore };
    });
  }, [ctx.data]);

  return (
    <div className='md:w-[calc(100%-var(--settings-panel))] w-full h-full overflow-scroll'>
      <div className='relative z-10 max-w-[1070px] mx-auto px-2.5 mt-6'>
        {parsedData.length > 0 ? (
          <ul className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-5'>
            {parsedData.map((i) => (
              <li key={i.id} className='my-2'>
                <div className='group cursor mx-1 md:mx-4 bg-amber-50/70 pb-2 rounded-md shadow-md overflow-hidden duration-200 hover:-translate-y-4'>
                  <button
                  type='button'
                    title='刪除'
                    className={`bg-red-100 text-red-400 p-2 rounded-4xl mx-0.5 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 delay-200 cursor-pointer absolute z-20 hover:translate-y-1 hover:bg-red-200 hover:text-red-500`}
                    onClick={() => {
                      ctx.removeData(i.id);
                    }}
                  >
                    <MdDelete />
                  </button>
                  <div className='relative'>
                    <Link to={`/${i.id}`} className="absolute h-full block w-full z-10 pointer-events-auto" />
                    <div className='overflow-hidden h-[200px] relative pointer-events-none'>
                      <img loading="lazy" className="group-hover:scale-110 h-full w-full object-cover duration-200 relative" src={i.randomCover || '/random_cover/0.jpg'} />
                      {i.dateTime && (
                        <div className={`${i.is3DaysBefore ? "bg-amber-500/60 text-white" : "bg-purple-600/60 text-white"} p-2 rounded-md absolute bottom-[5%] right-[10%] backdrop-blur-md`}>
                          {i.labelDateTime}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="group-hover:text-stone-700 mx-3 font-bold" dangerouslySetInnerHTML={{ __html: i.title }} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className='bg-white/50 backdrop-blur-md rounded-md p-5 m-auto grid items-center'>
            <h2 className='text-center font-bold'>還沒有任何項目，請創建一個吧~ </h2>
            <button type='button' className='cursor-pointer p-3.5 rounded-md bg-stone-200 hover:bg-stone-300' onClick={ctx.toggleDisplayCreateForm}>
              <p>創建一個</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;