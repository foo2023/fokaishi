import { useState, useEffect, useRef } from 'react';

const PreviewThumbnail = ({ bg, handleBackgroundChange }) => {
  const [mouseEnterPreview, setMouseEnterPreview] = useState(false);
  const intervalRef = useRef(null);
  const previewedOnceRef = useRef(false); // 防止重複 preview

  useEffect(() => {
    if (mouseEnterPreview && !previewedOnceRef.current) {
      previewedOnceRef.current = true;

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
    handleBackgroundChange(bg.path);
  };

  return (
    <div
      key={bg.path}
      className="relative border rounded overflow-hidden cursor-pointer group"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {previewedOnceRef.current && 
      <video
        src={bg.previewVideo}
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        muted
        loop
        autoPlay
      />}
      <img
        src={bg.previewImage}
        alt={bg.title}
        className="w-full h-20 object-cover"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center">
        {bg.title}
      </div>
    </div>
  );
};

export default PreviewThumbnail;
