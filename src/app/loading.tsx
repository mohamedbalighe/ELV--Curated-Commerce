import React from 'react'
import { BeatLoader } from 'react-spinners'

export default function loading() {
  return<>
      <div className='h-screen flex justify-center items-center bg-[#FFFFFF]'>
          <BeatLoader color="#000000" />
    </div></>
}
