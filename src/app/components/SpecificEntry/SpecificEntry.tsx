"use client"

import Link from "next/link";
import type { JournalType } from "../../../lib/types/JournalType";
import { useEffect, useState } from "react";
import { deleteEntry, getSpecificEntry } from "../../actions";

const SpecificEntry: React.FC<{ params: { id: string } }> = ({ params }) => {
    const id = params.id;
    const [entries, setEntries] = useState<JournalType[]>([]);
  
    useEffect(() => {
      const fetchEntries = async () => {
        const data = await getSpecificEntry(id)
        setEntries(data);
      };
  
      fetchEntries();
    }, [id]);
  
    const handleDeleteEntry = async (id: string) => {
  
      const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
      if (!confirmDelete) {
        return; // Do nothing if the user cancels deletion
      }
  
      try {
        await deleteEntry(id)
        console.log("Entry deleted successfully!");
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    };
  
    return (
      <div className="max-w-2xl mx-auto mt-8">
        <Link href="/">
          <div className="absolute top-4 left-4 cursor-pointer">
            <div className="bg-blue-500 text-white w-10 h-10 rounded-full flex items-center justify-center">
              <span className="text-xl">{"<"}</span>
            </div>
          </div>
        </Link>
        {entries.map((entry: JournalType) => (
          <div key={entry.id} className="mb-8 p-4 border rounded-md">
            <h1 className="text-2xl font-bold mb-4">{entry.title || 'Untitled'}</h1>
            <p className="text-lg">{entry.content}</p>
            <div className="text-sm mt-2">
              {entry.createdAt && (
                <div>
                  Created At: {new Date(entry.createdAt).toLocaleString()}
                </div>
              )}
              {entry.modifiedAt && (
                <div>
                  Modified At: {new Date(entry.modifiedAt).toLocaleString()}
                </div>
              )}
            </div>
            <div className="flex mt-4 space-x-4">
              <Link href={`/entry/${entry.id}/edit`} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300">
                Edit
              </Link>
              <button
                onClick={() => handleDeleteEntry(entry.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    )
}

export default SpecificEntry