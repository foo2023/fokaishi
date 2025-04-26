import { useState, useEffect, useRef, useContext } from 'react';
import SettingsContext from '../context/SettingsContext';
import { FaCircleCheck } from 'react-icons/fa6';

const PreviewThumbnail = ({ bg, handleBackgroundChange }) => {
  const settingsCtx = useContext(SettingsContext);

  const [mouseEnterPreview, setMouseEnterPreview] = useState(false);
  const intervalRef = useRef(null);
  const [previewedOnce, setPreviewedOnce] = useState(false); // 防止重複 preview

  useEffect(() => {
    if (mouseEnterPreview && !previewedOnce) {
      setPreviewedOnce(true);

      intervalRef.current = setInterval(() => {
        console.count("Preview triggered!");
        // 你可以在這裡加入其他預覽行為，例如更換封面圖、啟動動畫等
      }, 1000);
    }

    if (!mouseEnterPreview) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => clearInterval(intervalRef.current);
  }, [mouseEnterPreview]);

  const handleMouseEnter = () => {
    setMouseEnterPreview(true);
  };

  const handleMouseLeave = () => {
    setMouseEnterPreview(false);
  };

  const handleClick = () => {
    handleBackgroundChange(bg.id);
  };

  return (
    <div
      key={bg.path}
      className={`${ settingsCtx.background.id === bg.id ? "border-4 border-green-500" : "border" } relative rounded overflow-hidden cursor-pointer group`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {settingsCtx.background.id === bg.id && <div className='z-10 absolute inset-0 w-full h-full object-cover transition-all duration-300 text-green-500 flex justify-center items-center' ><FaCircleCheck className='size-5' fill='currentColor' stroke='white' strokeWidth={50}/></div>}
      {previewedOnce && 
      <video
        src={`/${bg.previewVideo}`}
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        muted
        loop
        autoPlay
      />}
      <img
        loading="lazy"
        src={`/${bg.previewImage}`}
        alt={bg.title}
        className="w-full h-20 object-cover"
      />
      <div className={`${settingsCtx.background.id === bg.id ? "bg-green-900/60" : "bg-black/60"} z-20 absolute bottom-0 left-0 right-0 text-white text-xs text-center`}>
        {bg.title}
      </div>
    </div>
  );
};

export default PreviewThumbnail;
