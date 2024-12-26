import React from 'react'
import {forwardRef} from 'react'
const Demo = (props,ref) => {
  return (
    <div ref={ref} className='h-[200px] w-full bg-red-900 mt-[100rem]' >
      
    </div>
  )
}

export default forwardRef(Demo);
