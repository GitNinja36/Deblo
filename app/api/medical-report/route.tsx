import { openai } from "@/config/OpenAiModel";
import { db } from "@/config/db";
import { sessionChartTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

const REPORT_GEN_PROMPT = `You are an Al Medical Voice Agent that just finished a voice conversation with a user. Depends on doctor AI agent info and Conversation between AI medical agent and user, generate a structured report with the following fields:
1. sessionld: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician Al")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of Al suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
"sessionld": "string",
"agent": "string",
"user": "string",
"timestamp". "ISO Date string",
"chiefComplaint": "string",
"summary": "string",
"symptoms": ["symptom1", "symptom2"],
"duration": "string",
"severity": "string",
"medicationsMentioned": ["med1", "med2"],
"recommendations": ["rec1", "rec2"],
Only include valid fields. Respond with nothing else.
`

export async function POST(req:NextRequest) {
    const {sessionId, sessionDetail, messages} = await req.json();
    const trimmedMessages = messages
      .slice(-8)
      .map((m: { role: string; text: string }) => `${m.role}: ${m.text}`)
      .join("\n");

    const doctorInfo = `
        Doctor Specialist: ${sessionDetail?.selectedDoctor?.specialist}
        Doctor Prompt: ${sessionDetail?.selectedDoctor?.agentPrompt}
        Notes: ${sessionDetail?.notes}
    `;

    try {
        const userInput = `AI Doctor Agent Info:\n${doctorInfo}\n\nConversation:\n${trimmedMessages}`; 
        const completion = await openai.chat.completions.create({
            model: "google/gemini-2.5-flash-preview-05-20",
            messages: [
              {role: "system", content: REPORT_GEN_PROMPT},
              {role: "user", content: userInput},
            ],
            max_tokens: 800,
          });
      
        const raw = completion.choices[0]?.message?.content ?? "";

        const cleaned = raw
            .replace(/```json|```/g, "")
            .replace(/\n/g, "")
            .trim();
            
        let parsedReport;
        try {
          parsedReport = JSON.parse(cleaned);
        } catch (err) {
          console.error("[JSON Parse Error]", err);
          return NextResponse.json({ error: "Invalid JSON from OpenAI", raw }, { status: 500 });
        }

        await db.update(sessionChartTable).set({
            report:parsedReport,
            conversation : messages
        }).where(eq(sessionChartTable.sessionId, sessionId));

        return NextResponse.json(parsedReport);
    } catch (e) {
        return NextResponse.json(e); 
    }
}