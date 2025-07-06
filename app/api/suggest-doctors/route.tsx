import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { notes } = await req.json();
  
    try {
      const completion = await openai.chat.completions.create({
        model: "google/gemini-2.5-flash-preview-05-20",
        messages: [
          {
            role: "system",
            content:
              "You are a medical assistant. Use this list only:\n\n" +
              JSON.stringify(AIDoctorAgents),
          },
          {
            role: "user",
            content:
              `Patient Notes: ${notes}. ` +
              `Depends on user notes and symptoms, Please suggest list of doctors, return object in json only.`,
          },
        ],
        max_tokens: 800,
      });
  
      const raw = completion.choices[0].message?.content || "";
      const jsonStart = raw.indexOf("[");
      const jsonEnd = raw.lastIndexOf("]") + 1;
      const jsonText = raw.slice(jsonStart, jsonEnd);
  
      const data = JSON.parse(jsonText);
  
      if (!Array.isArray(data)) {
        return NextResponse.json({ error: "Not a valid doctor array", raw }, { status: 500 });
      }
  
      return NextResponse.json(data);
    } catch (e: any) {
      console.error("Doctor Suggestion Failed:", e);
      return NextResponse.json(
        {
          error: {
            message: e.message || "Something went wrong",
            code: e?.response?.status || 500,
          },
        },
        { status: 500 }
      );
    }
  }