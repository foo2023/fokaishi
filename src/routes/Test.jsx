import React, { useEffect } from 'react'
import { doesFontExist } from '../utils/detectFont'

const Test = () => {
  useEffect(async () => {
    await doesFontExist("kaiti");
    await doesFontExist("STKaiTi");
    await doesFontExist("lisu");
    await doesFontExist("STFangsong");
    await doesFontExist("FangSong");
    await doesFontExist("FZShuTi");
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default Test
