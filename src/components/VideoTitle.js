import React from 'react'

const VideoTitle = ({ title, overview }) => {
  return (
    <div className='absolute w-screen px-24 text-white pt-[20%] bg-gradient-to-r from-black aspect-video'>
      <h1 className='text-6xl font-bold'>{title}</h1>
      <p className='w-1/4 py-6 text-lg'>{overview}</p>
      <div >
        <button className='p-3 px-12 text-lg text-black bg-white rounded-lg bg-white-500 hover:bg-opacity-80'>
          ▶ Play</button>
        <button className='p-3 px-12 mx-2 text-lg text-white bg-gray-500 bg-opacity-50 rounded-lg hover:bg-opacity-80'>
          More Info</button>.
      </div>
    </div>
  )
}

export default VideoTitle
