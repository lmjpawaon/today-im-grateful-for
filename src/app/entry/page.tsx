import type { JournalType } from "../../../lib/types/JournalType";

const EntriesPage: React.FC = async () => {
  const fetchEntries = async () => {
    const response = await fetch('http://localhost:3000/api/journal', {
      next: {
        revalidate: 30
      }
    });
    return response.json()
  };

  const entries: Record<string, { entries: JournalType[] }> = await fetchEntries();

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
                  <div>Title: {entry.title}</div>
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


export default EntriesPage;