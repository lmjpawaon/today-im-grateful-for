import { prisma } from "../../../../../lib/prisma";
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

export async function PATCH(req: NextRequest) {
  try {
    const urlParts = req.url.split("/");
    const journalId = urlParts[urlParts.length - 1];
    const data = await req.json(); // Read the JSON data from the request body

    // Validate data (optional)
    // You can add validation rules here to ensure required fields are present, etc.
    // const errors = validateEntry(data);
    // if (errors) return NextResponse.json({ errors }, { status: 400 });

    const updatedEntry = await prisma.journalEntry.update({
      where: {
        id: parseInt(journalId), // Update the entry with the specified ID
      },
      data: {
        // Map request data to prisma model fields
        ...data,
        // Add additional fields or transformations if needed (e.g., updatedAt)
        // updatedAt: new Date(),
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

    // Validate data (optional)
    // You can add validation rules here to ensure required fields are present, etc.
    // const errors = validateEntry(data);
    // if (errors) return NextResponse.json({ errors }, { status: 400 });

    const deletedEntry = await prisma.journalEntry.delete({
      where: {
        id: parseInt(journalId), // Update the entry with the specified ID
      }
    });

    return NextResponse.json(deletedEntry);
  } catch (error) {
    console.error("Error deleting journal entry:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}