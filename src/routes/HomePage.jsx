import React, { useContext, useMemo } from 'react';
import SharedContext from '../context/SharedContext';
import { data, Link } from 'react-router';
import { MdDelete } from "react-icons/md";
import { groupingByDate } from '../utils/groupingByDate';
import Items from '../components/page/HomePage/Items';

const HomePage = () => {
  const ctx = useContext(SharedContext);

  // const arrangedData = [{period: 'today', data: []}, {period: 'yesterday', data: []}, {period: 'earlier', data: []}]
  const arrangedData = useMemo(() => {
    // groupingByDate(ctx.data);
    return groupingByDate(ctx.data);

  }, [ctx.data]);

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
    <div className='md:w-[calc(100%-var(--settings-panel))] w-full h-full overflow-y-scroll'>
      <div className='relative z-10 max-w-[1070px] mx-auto px-2.5 mt-6'>
        {/* Latest */}
        {arrangedData.today.length > 0 && (
          <Items type='today' data={arrangedData.today} removeData={ctx.removeData} />
        )
        }
        {arrangedData.yesterday.length > 0 && (
          <Items type='yesterday' data={arrangedData.yesterday} removeData={ctx.removeData} />
        )}
        {arrangedData.twoDaysAgo.length > 0 && (
          <Items type='twoDaysAgo' data={arrangedData.twoDaysAgo} removeData={ctx.removeData} />
        )}
        {arrangedData.earlier.length > 0 && (
          <Items type='earlier' data={arrangedData.earlier} removeData={ctx.removeData} />
        )}
        {arrangedData.today.length <= 0 && arrangedData.yesterday.length <= 0 && arrangedData.twoDaysAgo <= 0 && arrangedData.earlier.length <= 0 && (
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