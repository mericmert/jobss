import React from 'react'
import {SyncLoader} from 'react-spinners';

export default function LoadingPage() {
  return (
    <div className='fixed h-screen w-full flex justify-center items-center'>
        <SyncLoader color='#0084C7' />
    </div>
  )
}
