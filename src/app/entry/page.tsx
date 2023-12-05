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

  const entries = await fetchEntries();

  return (
    <div>
      <h1>Journal Entries</h1>  
      <ul>
        {entries.map((entry: JournalType) => (
          <li key={entry.id}>{entry.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default EntriesPage;