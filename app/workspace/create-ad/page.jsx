"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import axios from "axios";
import { useMutation } from "convex/react";
import { LoaderCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "sonner";

function CreateAd() {
    const [userInput, setUserInput] = useState();
    const [loading, setLoading] = useState(false);
    const { userDetail, setUserDetail } = useContext(UserDetailContext);
    const router = useRouter();

    const CreateNewVideoData = useMutation(api.videoData.CreateNewVideoData)

    const GenerateAIVideoScript = async () => {
        if(userDetail?.credits < 10)
        {
            toast('Please add more credits!')
            return 
        }
        
        setLoading(true);
        const result = await axios.post('/api/generate-script', {
            topic: userInput,
        });
        console.log(result.data);
        const RAWResult = (result?.data).replace('```json', '').replace('```','');
        const JSONResult = JSON.parse(RAWResult);
        const resp = await CreateNewVideoData({
            uid : userDetail?._id,
            topic : userInput,
            scriptVariant : JSONResult
        });
        console.log(resp);
        setLoading(false);
        router.push('/workspace/create-ad/'+resp);
    } 

    return (
        <div className="mt-32 flex flex-col items-center justify-center w-full"> 
            <div>
                <Image src={'/advertisement.png'} alt="Advertisement" width={150} height={150} />
            </div>
            <h2 className="font-bold text-2xl text-center text-purple-500"> Create AI Generated Video Ads in Just One Click! </h2>
            <p className="mt-3 text-lg text-blue-500"> 
                Turn your ideas into stunning, scroll-stopping videos 
                -- instantly, effortlessly, and without editing skills! 
            </p>

            <Input 
                placeholder="Enter the Topic or Product Info" 
                className={'w-96 text-lg mt-5'} 
                value = {userInput}
                onChange = {(e) => setUserInput(e.target.value)}
            />
            <Button 
                className={'mt-5 w-md'} 
                onClick = {GenerateAIVideoScript} 
                disabled = {loading}
            > { loading? <LoaderCircle className='animate-spin h-5 w-5' /> : <Sparkles className="h-5 w-5" />} Generate                 
            </Button>
            
        </div>
    )
}

export default CreateAd;