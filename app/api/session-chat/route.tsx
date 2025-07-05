import { db } from "@/config/db";
import { sessionChartTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid';

export async function POST(req:NextRequest) {
    const {notes, selectedDoctor} = await req.json();
    const user = await currentUser();
    try {
        const sessionId = uuidv4()
        const result = await db.insert(sessionChartTable).values({
            sessionId : sessionId,
            createdBy : user?.primaryEmailAddress?.emailAddress,
            notes : notes,
            selectedDoctor : selectedDoctor,
            createdOn : (new Date()).toString()
            //@ts-ignore
        }).returning({sessionChartTable})

        return NextResponse.json(result[0]?.sessionChartTable);
    } catch (e) {
        NextResponse.json(e)
    }
}