import React, { useContext, useState } from 'react';
import SettingsContext from '../context/SettingsContext';
import PreviewThumbnail from './previewThumbnail';
import { IoClose } from 'react-icons/io5';
import { FiSettings } from 'react-icons/fi';
import { FaUndo } from 'react-icons/fa';
import { backgroundOptions } from '../utils/backgroundOptions';


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
      className={`${settingsCtx.settingsPanel ? 'p-4 h-[40vh]' : 'p-0 h-0'} w-full bottom-0 md:w-[var(--settings-panel)] md:h-full right-0 fixed z-40 bg-white/80 backdrop-blur-md rounded-xl shadow-md transition-all duration-700 overflow-auto`}
    >
      {settingsCtx.settingsPanel ?
        <>
          <div className='text-2xl flex justify-between items-center'>
            <h2 className='flex gap-3 items-center font-bold'><FiSettings /> 設置</h2>
            <button className="bg-gray-100/60 backdrop-blur-md rounded-full p-4 hover:bg-gray-200/60 cursor-pointer" onClick={settingsCtx.toggleSettingsPanel}>
              <IoClose />
            </button>
          </div>
          {/* 字體設定 */}
          <h3 className="text-lg font-bold mb-2">字體</h3>
          <div className="flex items-center gap-2 mb-4">
            <span>5px</span>
            <input
              type="range"
              min="5"
              max="30"
              value={settingsCtx.fontSize}
              onChange={handleFontSizeChange}
              className="w-full"
            />
            <span>30px</span>
          </div>

          {/* 背景設定 */}
          <h3 className="text-lg font-bold mb-2">背景</h3>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {backgroundOptions.map((bg, index) => (
              <PreviewThumbnail key={index} bg={ bg } handleBackgroundChange={handleBackgroundChange} />
            ))}
          </div>

          {/* 重設 */}
          <button
            onClick={handleReset}
            className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white font-semibold rounded flex items-center gap-3 justify-center cursor-pointer"
          ><FaUndo />
            恢復預設設定
          </button>

          {/* {關於} */}
          <div className='mt-8 cursor-default text-amber-500 font-bold'>By 净土共修@2025</div>

        </>
        : <></>}
    </div>
  );
};

export default SettingsPanel;
