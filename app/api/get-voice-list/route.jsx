import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req) {
    const result = await axios.get(
        'https://openapi.akool.com/api/open/v3/voice/list', 
        {
            headers:{
                Authorization: 'Bearer ${process.env.AKOOL_API_TOKEN}'
            }
        }
    ) 

    return NextResponse.json(result.data?.data)
}