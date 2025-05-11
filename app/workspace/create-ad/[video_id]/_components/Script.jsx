import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Video } from "lucide-react";
import React from "react";

function Script({ videoData, onHandleInputChange }) {
    return (
        <div className="p-5 shadow rounded-xl">
            <h2 className="font-bold text-lg flex gap-2 items-center"> <Video className='p-2 bg-green-500 text-white h-10 w-10 rounded-md' /> Video Ads Script </h2>
            <hr className="my-3"/>
            <div className="">
                <label className="text-gray-700">  Video Project Topic </label>
                <Input 
                value={videoData?.topic} 
                className={'text-xl'} />
            </div>
            <div className="mt-3">
                <label className="text-gray-700"> Video Script </label>
                <Textarea 
                className={'text-xl'} 
                onChange = {(e) => onHandleInputChange('script', e.target.value)}
                value={videoData?.script??videoData?.scriptVariant[0]?.content} />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-3">
                {videoData?.scriptVariant?.map((script, index) => (
                    <div key={index} 
                        className={'p-5 text-sm border rounded-lg cursor-pointer ${script?.content === videoData?.script&& "border-purple-700 bg-blue-100 text-purple-400": "hover:bg-gray-100" }'} 
                        onClick={() => onHandleInputChange('script', script?.content)}> 
                        <h2 className="line-clamp-3"> {script?.content} </h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Script