import React from 'react'
import VideoList from './_components/VideoList'

function Workspace() {
    return (
        <div className='mt-7'>
            <p className='font-bold text-primary'>Welcome to Your Workspace!</p>
            <h2 className='font-bold text-2xl'> Explore and Create New Video Ads </h2>
            <p> Start Exploring new Video Ads and Create on For You! </p>
            <VideoList />
        </div>
    )
}

export default Workspace