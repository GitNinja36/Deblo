import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {notes} = await req.json();
    try {
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-preview-05-20",
            messages: [
                { role: "system", content: JSON.stringify(AIDoctorAgents) },
                { role: "user", content: "Users Notes/Symptoms:"+notes+"Depends on user notes and symptoms, Please suggest list of doctors, return object in json only" }
            ],
        });

        const rawRes = completion.choices[0].message;
        //@ts-ignore
        const Res = rawRes.content.trim().replace('```json', '').replace('```', '');
        const JSONRes = JSON.parse(Res);
        return NextResponse.json(JSONRes)
    } catch (e) {
        return NextResponse.json(e)
    }
}