import axios from "axios";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function AvatarList({ videoData, onHandleInputChange }){

    const [avatarList, setAvatarList] = useState([]);

    useEffect(() => {
        GetAvatarList
    }, [])

    const GetAvatarList = async() => {
        const result = await axios.get('/api/get-avatar-list')
        console.log(result.data)
        setAvatarList(result.data?.result);
    }

    return (
        <div className="p-5 mt-5 shadow rounded-xl">
            <h2 className="font-bold text-lg flex gap-2 items-center"> <User className='p-2 bg-purple-500 text-white h-10 w-10 rounded-md' /> Select Avatar </h2>
            <hr className="my-3" />
            <div>
                <label> Select Your Favourite Avatar for Your Ad</label>
                <div className="flex flex-wrap gap-5 h-[200px] overflow-auto mt-3">
                    {avatarList?.length>0&&avatarList?.map((avatar, index) => (
                        <div 
                        key={index} 
                        onClick={()=>onHandleInputChange('avatar', avatar)}
                        className={'${videoData?.avatar?._id==avatar?._id&&"border border-primary bg-blue-300 text-primary"} p-1 rounded-lg cursor-pointer'} >
                            <Image 
                            src={avatar?.thumbnailUrl} 
                            alt={avatar?.avatar_id} 
                            width={100} 
                            height={100} 
                            className="rounded-lg bg-black"
                            />
                            <h2 className="text-center"> {avatar?.name} </h2>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AvatarList