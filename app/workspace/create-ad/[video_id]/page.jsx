"use client";
import { api } from "@/convex/_generated/api";
import { useConvex, useMutation, useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import Script from "./_components/Script";
import React, { useContext, useEffect, useState } from "react";
import UploadFiles from "./_components/UploadFiles";
import AvatarList from "./_components/AvatarList";
import VoiceList from "./_components/VoiceList";
import { Button } from "@/components/ui/button";
import { LoaderCircle, Sparkles } from "lucide-react";
import ImageKit from "imagekit";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";



function CreateVideo() {
    const {video_id} = useParams();
    const [videoData, setVideoData] = useState();
    const [isGenerateButtonClick, setIsGenerateButtonClick] = useState(false)
    const [ loading, setLoading ] = useState(false)
    const [ userDetail, setUserDetail ] = useContext(UserDetailContext)
    const createVideoDataEntry = useMutation(api.videoData.updateInitialVideoData)
    const router = useRouter()
    const UpdateUserCredits = useMutation(api.users.updateUserCredits)

    // console.log(video_id);
    // const VideoData = useQuery(api.videoData.GetVideoDataById,{
    //    vid: video_id
    // });
    // console.log(VideoData);

    const imageKit = new ImageKit({
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_IMAGEKIT_KEY,
        privateKey: process.env.PRIVATE_IMAGEKIT_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    })

    const convex = useConvex();
    useEffect(() => {
        GetVideoData();
    },[])
    const GetVideoData = async () => {
        const result = await convex.query(api.videoData.GetVideoDataById, {
            vid: video_id
        });
        console.log(result);
        setVideoData(result);
    }

    const onHandleInputChange = async(field, value) => {
        setVideoData(prev => ({
            ...prev,
            [field]: value
        }))
        console.log(videoData)

    }

    const GenerateVideo = async() => {
        setLoading(true)
        const rawFiles = videoData?.rawFiles
        let uploadedFiles = [];
        // rawFiles.forEach(async(file) => {
            // const imageRef = await imageKit.upload({
                // file: file,
                // fileName: Date.now().toString()+".png",
                // isPublished: true
            // })
            // console.log(imageRef.url)
            // uploadedFiles.push(imageRef.url)
        // })

        const uploadPromises = rawFiles.map(async(file) => 
            await imageKit.upload({
                file: file,
                fileName: Date.now().toString() + ".png",
                isPublished: true
            })
        )

        try{
            const uploadedFilesPromise = await Promise.all(uploadedPromises)
            const uploadedFiles = uploadedFilesPromise.map((imageRef) => imageRef.url)
            console.log(uploadedFiles)
            onHandleInputChange('assets', uploadedFiles)
        } catch (e)
        {
            console.log("Error", e)
        }

        // onHandleInputChange('assets', uploadedFiles)

        const result = await axios.post('/api/create-voice', {
            script: videoData?.script,
            voiceId: videoData?.voice?.voice_id
        })
        console.log(result.data?.audioUrl);
        onHandleInputChange('voiceUrl', result.data?.audioUrl)

        const AvatarResult = await axios.post('/api/create-avatar', {
            voiceUrl: result.data?.audioUrl,
            avatarId: videoData?.avatar?.avatar_id,
            videoRecordId: video_id
        });
        console.log(AvatarResult.data)
        // onHandleInputChange('avatarUrl', AvatarResult.data?.avatarVideoUrl)

        setUserDetail( prev => ({
            ...prev,
            credits: Number(userDetail?.credits) - 10
        }))

        const resp = await UpdateUserCredits({
            credits: Number(userDetail?.credits) - 10,
            uid: userDetail?._id
        })

        console.log(resp)

        setLoading(false)
        router.replace('/workspace')
    }

    useEffect(() => {
        async function saveDB() {
            if (videoData?.voiceUrl) {
                const result = await createVideoDataEntry({
                    topic: videoData?.topic,
                    scriptVariant: videoData?.scriptVariant,
                    videoDataRecordId: video_id,
                    assets: videoData?.assets,
                    avatar: videoData?.avatar,
                    script: videoData?.script,
                    voice: videoData?.voice,
                    voiceUrl: videoData?.voiceUrl
                });
                console.log(result)
                router.replace('/workspace')
            }
        }
    }, [videoData?.voiceUrl])

    return (
        <div> 
            <h2 className="font-bold text-2xl">Create Video Ad</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 mt-7">
                <div className="md:col-span-2">
                    <Script 
                    videoData={videoData} 
                    onHandleInputChange={onHandleInputChange} />
                    <UploadFiles videoData={videoData} />
                    <AvatarList videoData={videoData} onHandleInputChange={onHandleInputChange} />
                    <VoiceList videoData={videoData} onHandleInputChange={onHandleInputChange}/>
                    <Button 
                        className={'mt-7 w-full'} 
                        onClick={GenerateVideo} 
                        disabled={loading}> 
                        {loading? <LoaderCircle className="animate-spin" />: <Sparkles />} 
                        Generate 
                    </Button>
                </div>
                <div>
                    Preview
                </div>
            </div>
        </div>
    )
}

export default CreateVideo;