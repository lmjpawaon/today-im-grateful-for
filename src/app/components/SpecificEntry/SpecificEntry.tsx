"use client"

import Link from "next/link";
import type { JournalType } from "../../../lib/types/JournalType";
import { useEffect, useState } from "react";
import { deleteEntry, getSpecificEntry } from "../../actions";
import { lato, nunito, raleway } from "../../../styles/fonts";
import Loading from "../Reusable/Loading";

const SpecificEntry: React.FC<{ params: { id: string } }> = ({ params }) => {
    const id = params.id;
    const [isLoading, setIsLoading] = useState(true);
    const [entries, setEntries] = useState<JournalType[]>([]);
  
    useEffect(() => {
      const fetchEntries = async () => {
        setIsLoading(true);
        try {
          const data = await getSpecificEntry(id);
          setEntries(data);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchEntries();
    }, [id]);
  
    const handleDeleteEntry = async (id: string) => {
  
      const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
      if (!confirmDelete) {
        return;
      }
  
      try {
        await deleteEntry(id)
        // console.log("Entry deleted successfully!");
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    };
  
    return (
      <div className="max-w-2xl mx-auto mt-8">
        {isLoading && (
        <Loading/>)}
        {entries.map((entry: JournalType) => (
          <div key={entry.id} className="mb-8 p-4 border rounded-md">
            <h1 className={`${lato.variable} text-2xl font-bold mb-4`}>{entry.title || 'Untitled'}</h1>
            <p className={`${raleway.variable} text-lg justify-evenly`}>{entry.content}</p>
            <div className="text-xs mt-2">
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
              <button className={`${nunito.variable} bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring`}>
                <Link href={`/entry/${entry.id}/edit`} >
                  Edit
                </Link>
              </button>
              <button
                onClick={() => handleDeleteEntry(entry.id)}
                className={`${nunito.variable} bg-secondary text-white py-2 px-4 rounded-md hover:bg-accent focus:outline-none focus:ring`}
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