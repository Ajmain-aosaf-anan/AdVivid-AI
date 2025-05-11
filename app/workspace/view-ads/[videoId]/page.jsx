"use client"

import { api } from "@/convex/_generated/api";
import { Player } from "@remotion/player";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import PreviewAd1 from "../_components/PreviewAd1";
import { Button } from "@/components/ui/button";


function ViewAds() {

    const {videoId} = useParams()

    const videoInfo = useQuery(api.videoData.GetVideoDataById, {
        vid: videoId
    })

    console.log(videoInfo)

    return (
        <div className="mt-10">
            <h2 className="font-bold text-2xl"> Select the best Video Ads style </h2>
            <p> Explore and select the video style which matches to your product </p>

            <div className='flex gap-10 flex-wrap'>
                <div>
                    <Player 
                        component={PreviewAd1} 
                        durationInFrames={480} 
                        compositionWidth={720} 
                        compositionHeight={1280}
                        fps={30}
                        controls
                        style={{width:'25vw', height:'70vh'}} inputProps={{videoInfo: videoInfo}} />

                    <Button className = {'mt-5 w-full'} > Render for Download </Button>
                </div>
                <div>
                    <Player 
                        component={PreviewAd1} 
                        durationInFrames={480} 
                        compositionWidth={720} 
                        compositionHeight={1280}
                        fps={30}
                        controls
                        style={{width:'25vw', height:'70vh'}} inputProps={{videoInfo: videoInfo}} />

                    <Button className = {'mt-5 w-full'} > Render for Download </Button>
                </div>
                <div>
                    <Player 
                        component={PreviewAd1} 
                        durationInFrames={480} 
                        compositionWidth={720} 
                        compositionHeight={1280}
                        fps={30}
                        controls
                        style={{width:'25vw', height:'70vh'}} inputProps={{videoInfo: videoInfo}} />

                    <Button className = {'mt-5 w-full'} > Render for Download </Button>
                </div>
            </div>
        </div>
    )
}

export default ViewAds