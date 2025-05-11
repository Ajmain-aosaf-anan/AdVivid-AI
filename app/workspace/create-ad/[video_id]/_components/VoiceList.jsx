import axios from "axios";
import { Mars, Mic, PlayCircleIcon, Venus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

function VoiceList({ videoData, onHandleInputChange }){

    const [voiceList, setVoiceList] = useState([]);
    const [playAudio, setPlayAudio] = useState()
    const audioRef = useRef(null)

    useEffect(() => {
        GetVoiceList()
    }, [])

    const GetVoiceList = async() => {
        const result = await axios.get('/api/get-voice-list')
        console.log(result.data)
        setVoiceList(result.data)
    }

    useEffect(() => {
        if (audioRef?.current && playAudio)
        {
            audioRef?.current.load();
            audioRef?.current?.play();
        }
    }, [playAudio])

    return (
        <div className="p-5 shadow rounded-2xl mt-6">
            <h2 className="font-bold text-lg flex gap-2 items-center"> <Mic className='p-2 bg-blue-500 text-white h-10 w-10 rounded-md' /> Select Voice </h2>
            <hr className="my-4"/>
            <audio controls ref={audioRef} className="hidden">
                <source src={playAudio} type="audio/mp3" />
            </audio>
            <div>
                <label> Select Voice for Your Video Ad </label>
                <div className="grid grid-cols-2 gep-5 w-full h-[200px] overflow-auto">
                    {voiceList.map((voice, index) => (
                        <div key={index} className="flex items-center 
                        justify-between border rounded-md p-4 w-full 
                        cursor-pointer ${videoData?.voice?._id == voice?._id&&'bg-blue-300 text-primary border-primary'}" 
                        onClick={()=>onHandleInputChange('voice', voice)}>
                            <div className="flex gap-2 items-center">
                                <PlayCircleIcon className="text-primary" onClick={() => setPlayAudio(voice?.preview)} />
                                <div>
                                    <h2> {voice.name} </h2>
                                    <h2 className="text-xs"> {voice.accent} ({voice.description}) </h2>
                                    <h2> {voice.language} </h2>
                                </div>
                                <div>
                                    {voice?.gender == 'Male' ? <Mars className="text-blue-500"/> : <Venus className="text-pink-500"/> }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VoiceList