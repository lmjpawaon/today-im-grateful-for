import Link from "next/link";
import type { JournalType } from "../lib/types/JournalType";
import { getAllEntries } from "./actions";

const Home: React.FC = async () => {

  const entries: Record<string, { entries: JournalType[] }> = await getAllEntries();

  if (Object.keys(entries).length === 0) {
    console.error('No entries data found');
    return <div>No entries found</div>;
  }

  return (
    <div>
      <h1>Journal Entries</h1>
      {Object.entries(entries).map(([date, { entries }]) => (
        <div key={date}>
          <h2>{date}</h2>
          <ul>
            {entries.map((entry: JournalType) => (
              <li key={entry.id}>
                {entry.title ? (
                  // Wrap title in Link component
                  <Link href={`/entry/${entry.id}`}>
                    {entry.title}
                  </Link>
                ) : (
                  <div>Content: {entry.content}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};


export default Home;