import type { JournalType } from "../../../../lib/types/JournalType"

const EntryDetails: React.FC<{params: {id: string}}> = async ({params}) =>{

  const id  = params.id

  const fetchEntries = async () => {
    const response = await fetch(`http://localhost:3000/api/journal/${id}`, {
      next: {
        revalidate: 30
      }
    });
    return response.json()
  };

  const entries = await fetchEntries();

  return (
    <div>
      <h1>Journal Entry {id}</h1>  
      <ul>
        {entries.map((entry: JournalType) => (
          <li key={entry.id}>{entry.content}{entry.createdAt?.toString()}{entry.modifiedAt?.toString()}</li>
        ))}
      </ul>
    </div>
  )
}

export default EntryDetails