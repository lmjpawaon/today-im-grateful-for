import { prisma } from "../../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import type { JournalType } from "../../../../lib/types/JournalType";

interface GroupedEntries {
  [date: string]: {
    entries: JournalType[];
  };
}

export async function GET() {
    try {
      const entriesByDate = await prisma.journalEntry.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
      
      const groupedEntries: GroupedEntries = {}
      
      for (const entry of entriesByDate) {
        const date = entry.createdAt.toISOString().slice(0, 10);
        if (!groupedEntries[date]) {
          groupedEntries[date] = {
            entries: [],
          };
        }
        groupedEntries[date].entries.push({
          id: entry.id.toString(), // Convert id to string if needed
          title: entry.title ?? undefined,
          content: entry.content,
          createdAt: entry.createdAt,
          modifiedAt: entry.modifiedAt,
        });
      }
      
      const groupedEntriesArray = Object.values(groupedEntries);
      
      console.log(groupedEntriesArray);
      return NextResponse.json(groupedEntries)
    } catch (error) {
      console.error('Error fetching journal entries:', error);
      return NextResponse.json({ error: "Internal Server Error" }, {status:500});
    }
}

export async function POST(req: NextResponse) {
  try {
    const data = await req.json();

    // Validate data (optional)
    // You can add validation rules here to ensure required fields are present, etc.
    // const errors = validateEntry(data);
    // if (errors) return NextResponse.json({ errors }, { status: 400 });

    const entry = await prisma.journalEntry.create({
      data: {
        // Map request data to prisma model fields
        ...data,
        // Add additional fields or transformations if needed
        createdAt: new Date(),
        modifiedAt: new Date(),
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}