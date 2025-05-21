import { useContext, useMemo } from 'react';
import SharedContext from '../context/SharedContext';
import { groupByDate } from '../utils/groupByDate';
import Section from '../components/page/HomePage/Section';

const HomePage = () => {
  const ctx = useContext(SharedContext);

  const groupedData = useMemo(() => groupByDate(ctx.data), [ctx.data]);

  const sections = [
    {type: 'today', label: '今天'},
    {type: 'yesterday', label: '昨天'},
    {type: 'twoDaysAgo', label: '前天'},
    {type: 'earlier', label: '早期'}
  ];

  const hasItems = sections.some(section => groupedData[section.type]?.length > 0);

  return (
    <div className='w-full md:w-[calc(100%-var(--settings-panel))] h-full overflow-y-scroll'>
      <div className='relative z-10 max-w-[1070px] mx-auto px-2.5 mt-6'>

        {/* Sections: 今天、昨天、前天、早期 */}
        {hasItems ? 
          (
            sections.map(({ type, label }) => 
              groupedData[type]?.length > 0 && (
                <Section
                  key={type}
                  type={type}
                  label={label}
                  data={groupedData[type]}
                  removeData={ctx.removeData}
                />
              )
            )
          ):(
            <div className='bg-white/50 backdrop-blur-md rounded-md p-5 m-auto grid items-center'>
              <h2 className='text-center font-bold'>還沒有任何項目，請創建一個吧~ </h2>
              <button type='button' className='cursor-pointer p-3.5 rounded-md bg-stone-200 hover:bg-stone-300' onClick={ctx.toggleDisplayCreateForm}>
                <p>創建一個</p>
              </button>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default HomePage;