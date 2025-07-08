import { db } from "@/config/db";
import { sessionChartTable, usersTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import {v4 as uuidv4} from 'uuid';
import { desc, eq } from "drizzle-orm";

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

export async function GET(req:NextRequest) {
    const {searchParams} = new URL(req.url);
    const sessionId = searchParams.get('sessionId');
    const user = await currentUser();

    if(sessionId == 'all'){
        //@ts-ignore
        const result = await db.select().from(sessionChartTable).where(eq(sessionChartTable.createdBy, user?.primaryEmailAddress?.emailAddress)).orderBy(desc(sessionChartTable.id))

        return NextResponse.json(result);
    }else{
        //@ts-ignore
        const result = await db.select().from(sessionChartTable).where(eq(sessionChartTable.sessionId, sessionId));

        return NextResponse.json(result[0]);
    }
}