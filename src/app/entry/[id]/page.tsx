"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { JournalType } from "../../../../lib/types/JournalType";
import { useEffect, useState } from "react";

const EntryDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const id = params.id;
  const router = useRouter();
  const [entries, setEntries] = useState<JournalType[]>([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch(`http://localhost:3000/api/journal/${id}`, {
        next: {
          revalidate: 0,
        },
      });
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, [id]);

  const handleDeleteEntry = async (id: string) => {
    try {
      await fetch(`http://localhost:3000/api/journal/${id}`, {
        method: "DELETE",
      });
      console.log("Entry deleted successfully!");
      setEntries(entries.filter(entry => entry.id !== id));
      router.push("/entry");
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