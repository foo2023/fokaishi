import * as React from "react";

function Toggle({ onPressedChange, pressed, icon: Icon }) {

  return (
      <button 
        data-slot="toggle"
        // className={finalClassName}
        className={"inline-flex items-center justify-center gap-2 rounded-md h-9 px-2 min-w-9 hover:bg-stone-300/50 hover:text-stone-500/90 " + (pressed ? 'text-shadow-amber-50 backdrop-blur-xs text-amber-600 bg-amber-300/60 ' : '')}
        type="button"
        onClick={onPressedChange}
      >
        <Icon className={pressed ? 'size-5.5' : 'size-4'}/>
      </button>
  )
}

export { Toggle }
