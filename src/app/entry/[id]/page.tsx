"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JournalType } from "../../../lib/types/JournalType";
import { useEffect, useState } from "react";
import { deleteEntry, getSpecificEntry } from "../../actions";

const EntryDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const id = params.id;
  const router = useRouter();
  const [entries, setEntries] = useState<JournalType[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getSpecificEntry(id)
      setEntries(data);
    };

    fetchEntries();
  }, [id]);

  const handleDeleteEntry = async (id: string) => {
    try {
      await deleteEntry(id)
      console.log("Entry deleted successfully!");
    } catch (error) {
      console.error("Error deleting entry:", error);
    }
  };

  return (
    <div>
      <h1>Journal Entry {id}</h1>
      <ul>
        {entries.map((entry: JournalType) => (
          <li key={entry.id}>
            {entry.content}
            {entry.createdAt && (
              <div>
                Created At: {new Date(entry.createdAt).toISOString()}
              </div>
            )}
            {entry.modifiedAt && (
              <div>
                Modified At: {new Date(entry.modifiedAt).toISOString()}
              </div>
            )}
            <div>
              <Link href={`/entry/${entry.id}/edit`}>
                Edit
              </Link>
              <button onClick={() => handleDeleteEntry(entry.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EntryDetails;