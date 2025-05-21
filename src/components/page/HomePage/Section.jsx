import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Section = ({type, label, data, removeData}) => {
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    if (type === 'earlier') {
      setCollapse(true);
    }
  }, []);

  function handleToggleCollapse () {
    setCollapse(prev => !prev);
  }
  return (
    <>
      <div className="bg-amber-50/40 w-full p-3 cursor-pointer rounded-md hover:bg-amber-50/60 border-1 hover:border-black border-black/0 transition-all" onClick={handleToggleCollapse}>
        <p className="inline-block">
          {collapse ? <FaChevronRight /> : <FaChevronDown />}
        </p>
        <p className="inline-block">{label}</p>
      </div>
      {collapse === false && 
      <ul className="grid gap-2">
        {data.map((i) => (
          <li key={i.id} className="my-2">
            <div className="group cursor mx-1 md:mx-4 bg-amber-50/70 rounded-md shadow-md overflow-hidden duration-200 hover:-translate-y-1">
              <button
                type="button"
                title="刪除"
                className={`bg-red-100 text-red-400 p-2 rounded-4xl md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 delay-200 cursor-pointer absolute z-20 hover:translate-y-1 hover:bg-red-200 hover:text-red-500`}
                onClick={() => {
                  removeData(i.id);
                }}
              >
                <MdDelete />
              </button>
              <div className="relative flex">
                <Link
                  to={`/${i.id}`}
                  className="absolute h-full block w-full z-10 pointer-events-auto"
                />

                {/* 图片方块 */}
                <div className="overflow-hidden w-[30%] min-h-20 h-auto md:w-44 md:h-28 relative pointer-events-none">
                  <img
                    loading="lazy"
                    className="group-hover:scale-105 h-full w-full object-cover duration-200 relative"
                    src={i.randomCover || "/random_cover/0.jpg"}
                  />
                </div>

                {/* 标题方块 */}
                <div>
                  <div
                    className="group-hover:text-stone-700 mx-3 font-bold"
                    dangerouslySetInnerHTML={{ __html: i.title }}
                  />
                  {i.dateTime && (
                    <div
                      className={`${
                        i.is3DaysBefore
                          ? "bg-amber-500/60 text-white"
                          : "bg-purple-600/60 text-white"
                      } p-2 rounded-md absolute bottom-[5%] right-[5%] backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-200 delay-200`}
                    >
                      {i.labelDateTime}
                    </div>
                  )}
                </div>
                
              </div>
            </div>
          </li>
        ))}
      </ul>}
    </>
  );
};

export default Section;
