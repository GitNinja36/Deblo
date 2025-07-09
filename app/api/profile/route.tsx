import { db } from "@/config/db";
import { usersTable, sessionChartTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user = await currentUser();

  const email = user?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

    let dbUser = users[0];
    
    if (!dbUser) {
      const result = await db
        .insert(usersTable)
        .values({
          name: user.fullName || "Unknown",
          email: email,
          credits: 10,
        })
        .returning();

      dbUser = result[0];
    }

    const sessions = await db
      .select()
      .from(sessionChartTable)
      .where(eq(sessionChartTable.createdBy, email));

    return NextResponse.json({
      user: dbUser,
      sessions,
    });
  } catch (e) {
    console.error("Failed to fetch profile:", e);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}