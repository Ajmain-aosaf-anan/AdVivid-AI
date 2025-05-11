import axios from "axios"
import { NextResponse } from "next/server"

export async function POST(req) {
        const {script, voiceId} = await req.json()
        const result = await axios.post('https://openapi.akool.com/api/open/v3/audio/create', {
            "input_text": script,
            "voice_id": voiceId,
            "rate": "100%"
        },
        {
            headers: {
                Authorization: 'Bearer '+process.env.AKOOL_API_TOKEN 
            }
        }
    ) 

    console.log(result.data)

    const generateVoiceId = result?.data?.data_id

    const poll = async(retries = 10, interval = 2000) => {
        for (let i = 0; i<retries; i++)
        {
            const pollRes = await axios.get('https://openapi.akool.com/api/open/v3/audio/infobymodelid?audio_model_id='+generateVoiceId,
                {
                    headers: {
                        Authorization: 'Bearer '+process.env.AKOOL_API_TOKEN 
                    }
                }
            )
            const status = pollRes?.data?.data?.status
            if (status == 3)
            {
                return pollRes.data.data.url
            }
            else if(status == 4)
            {
                throw new Error("Audio Processing Failed")
            }

            await new Promise(resolve => setTimeout(resolve, interval)) 
        }
    }
    const audioUrl = await poll();

    return NextResponse.json({
        audioUrl: audioUrl
    });
    // const audioFile = await axios.get('https://openapi.akool.com/api/open/v3/audio/infobymodelid?audio_model_id='+generateVoiceId,
    //     {
    //         headers: {
    //             Authorization: 'Bearer '+process.env.AKOOL_API_TOKEN 
    //         }
    //     }
    // )


    // console.log(audioFile?.data)
}