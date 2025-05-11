import { GENERATE_SCRIPT_PROMPT } from "@/services/Prompt";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
})

export async function POST (req) {

    const { topic } = await req.json();
    const PROMPT = GENERATE_SCRIPT_PROMPT.replace('{topic}', topic)
    
    const completion = await openai.chat.completions.create({
        model: "google/gemma-2-9b-it:free",
        messages: [
            { role: 'user', content: PROMPT }
        ],
    })

    console.log(completion.choices[0].message)
    return NextResponse.json(completion.choices[0].message?.content)
}