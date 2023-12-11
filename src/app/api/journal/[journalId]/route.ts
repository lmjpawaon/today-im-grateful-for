import { prisma } from "../../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const urlParts = req.url.split("/");
    const journalId = urlParts[urlParts.length - 1]; 

    if (!journalId) {
      throw new Error("Missing journalId parameter"); 
    }

    const entries = await prisma.journalEntry.findMany({
      where: { 
        id: parseInt(journalId)
      }, 
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

export async function PATCH(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const journalId = urlParts[urlParts.length - 1];
    const data = await req.json();

    const updatedEntry = await prisma.journalEntry.update({
      where: {
        id: parseInt(journalId),
      },
      data: {
        ...data,
        modifiedAt: new Date()
      },
    });

    return NextResponse.json(updatedEntry);
  } catch (error) {
    console.error("Error updating journal entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const journalId = urlParts[urlParts.length - 1];

    const deletedEntry = await prisma.journalEntry.delete({
      where: {
        id: parseInt(journalId), 
      }
    });

    return NextResponse.json(deletedEntry);
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}