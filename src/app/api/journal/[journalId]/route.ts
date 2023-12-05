import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const urlParts = req.url.split("/");
    const journalId = urlParts[urlParts.length - 1]; // Extract journalId from query parameter

    if (!journalId) {
      throw new Error("Missing journalId parameter"); // Handle missing parameter
    }

    const entries = await prisma.journalEntry.findMany({
      where: { 
        id: parseInt(journalId)
      }, // Filter by extracted journalId
    });

    if (!entries) {
      return NextResponse.json({ error: "Journal entry not found" });
    }

    return NextResponse.json(entries); // Use NextResponse directly
  } catch (error) {
    console.error("Error fetching journal entries:", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}