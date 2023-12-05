import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
      const entries = await prisma.journalEntry.findMany({});
      return NextResponse.json(entries)
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      return NextResponse.json({ error: "Internal Server Error" }, {status:500});
    }
}