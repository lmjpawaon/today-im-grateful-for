import { prisma } from "../../../../lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    try {
      const entries = await prisma.journalEntry.findMany({});
      return NextResponse.json(entries)
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
        modifiedAt: new Date()
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating journal entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}