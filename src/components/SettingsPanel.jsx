import React, { Suspense, useContext } from 'react';
import SettingsContext from '../context/SettingsContext';
import { FaGear, FaXmark, FaRotateRight, FaCloudArrowDown, FaDesktop, FaCircleCheck, FaStar } from 'react-icons/fa6';
import { backgroundOptions } from '../utils/backgroundOptions';
import LoadingSkeleton from './ui/LoadingSkeleton';
const PreviewThumbnail = React.lazy(() => import('./PreviewThumbnail'));
import { detectFont, supportedFonts } from 'detect-font';
import { fontFamilyOptions, localFontFamily } from '../utils/fontFamilyOptions';

const element = document.querySelector('#root');
console.log(detectFont(element));
console.log(supportedFonts(element));

const SettingsPanel = () => {
  const settingsCtx = useContext(SettingsContext);

  const handleFontSizeChange = (e) => {
    settingsCtx.serFontSize(Number(e.target.value));
  };

  const handleBackgroundChange = (id) => {
    settingsCtx.setBackground(id);
  };

  const handleReset = () => {
    settingsCtx.setDefaultSettings?.(); // ?. 避免 undefined 錯誤
  };

  return (
    <div
      className={`${settingsCtx.settingsPanel ? 'p-4 h-[40vh]' : 'p-0 h-0 w-0 border-[0]'} w-full bottom-0 md:w-[var(--settings-panel)] md:h-full right-0 fixed z-40 bg-white/80 backdrop-blur-md rounded-xl border-gray-600/60 border-2 transition-all duration-700 cursor-default`}
    >
      {settingsCtx.settingsPanel ?
        <>
          <div className='text-2xl flex justify-between items-center'>
            <h2 className='flex gap-3 items-center font-bold'><FaGear /> 設置</h2>
            <button className="bg-gray-100/60 backdrop-blur-md rounded-full p-4 hover:bg-gray-200/60 cursor-pointer" onClick={settingsCtx.toggleSettingsPanel}>
              <FaXmark />
            </button>
          </div>
          <div className='overflow-scroll h-full w-full'>
            {/* 字體設定 */}
            <h3 className="text-lg font-bold mb-2">字號</h3>
            <div className="flex items-center gap-2 mb-4">
              <span>5px</span>
              <input
                type="range"
                min="5"
                max="30"
                value={settingsCtx.fontSize}
                onChange={handleFontSizeChange}
                className="w-full cursor-pointer"
              />
              <span>30px</span>
            </div>
            <h3 className="text-lg font-bold mb-2">字體</h3>
            <div className='flex gap-2.5 mb-4 flex-wrap mx-3 md:mx-5 overflow-visible'>
              {settingsCtx.localSupportedFonts.map((fontFamily) => {
                const matchedFont = localFontFamily.find( item => item.fontFamily.includes(fontFamily) );
                return (
                  <div className='relative grow shrink basis-[50px]'>
                    <div title={`本地電腦字體: ${matchedFont.title}`} className={`${settingsCtx.fontFamilyId === matchedFont.id ? "border-green-500  border-4" : "border-black"} w-16 h-16 rounded-md overflow-hidden border-2 relative cursor-pointer`} onClick={() => {
                      settingsCtx.setFontFamilyId(matchedFont.id)
                    }}>
                      <p className={`fontPreview${fontFamily} text-5xl text-center my-2 pointer-events-none`}>佛</p>
                      <p className='absolute bottom-0 w-full h-auto bg-black/60 text-xs text-white text-center z-20'>{matchedFont.title}</p>
                      {settingsCtx.fontFamilyId === matchedFont.id && <div className='z-10 absolute inset-0 w-full h-full object-cover transition-all duration-300 text-green-500 flex justify-center items-center' ><FaCircleCheck className='size-5' fill='currentColor' stroke='white' strokeWidth={50}/></div>}
                    </div>
                    {matchedFont.recommend && 
                      <div className="absolute pointer-events-none top-[5%] -left-[5%]">
                        <span className="text-amber-300 flex">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} className='size-2.5' fill='currentColor' stroke='orange' strokeWidth={50}/>
                          ))}
                        </span>
                      </div>
                    }
                  </div>
                );
              })}
              {fontFamilyOptions.map((fontFamily) => {
                return (
                  <div className='relative grow shrink basis-[60px]'>
                    <div title="此字體包將從雲端加載下來" className={`${settingsCtx.fontFamilyId === fontFamily.id ? "border-green-500 border-4" : "border-black"} w-16 h-16 rounded-md overflow-hidden border-2 relative cursor-pointer`} onClick={() => {
                      settingsCtx.setFontFamilyId(fontFamily.id)
                    }}>
                      <img className='object-cover pointer-events-none' src='/huanfangFont.jpg'/>
                      <p className='absolute bottom-0 w-full h-auto bg-black/60 text-xs text-white text-center z-20'>{fontFamily.title}</p>
                      {settingsCtx.fontFamilyId === fontFamily.id && <div className='z-10 absolute inset-0 w-full h-full object-cover transition-all duration-300 text-green-500 flex justify-center items-center' ><FaCircleCheck className='size-5' fill='currentColor' stroke='white' strokeWidth={50}/></div>}
                    </div>
                    <div className='absolute top-[3%] -left-[2%] flex items-center pointer-events-none'>
                      <FaCloudArrowDown className='size-5 text-blue-400 animate-[bounceUp_2s_infinite]' fill='currentColor' stroke='white' strokeWidth={50}/>
                      {fontFamily.recommend && 
                        <span className="text-amber-300 flex ">
                          {[...Array(5)].map((_, index) => (
                            <FaStar key={index} className='size-2.5' fill='currentColor' stroke='orange' strokeWidth={50}/>
                          ))}
                        </span>
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 背景設定 */}
            <h3 className="text-lg font-bold mb-2">背景</h3>
            <div className="grid grid-cols-3 gap-2 mb-6">
                {backgroundOptions.map((bg, index) => (
                  <div className='className="w-full h-20'>
                    <Suspense fallback={<LoadingSkeleton />}>
                      <PreviewThumbnail key={index} bg={ bg } handleBackgroundChange={handleBackgroundChange} />
                    </Suspense>
                  </div>
                ))} 
              
            </div>

            {/* 重設 */}
            <button
              onClick={handleReset}
              className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded flex items-center gap-3 justify-center cursor-pointer"
            ><FaRotateRight />
              恢復預設設定
            </button>

            {/* {關於} */}
            <div className='mt-8 text-amber-500 font-bold'>By 净土共修@2025</div>
          </div>

        </>
        : <></>}
    </div>
  );
};

export default SettingsPanel;
