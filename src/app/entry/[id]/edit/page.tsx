"use client"
import { useEffect, useState } from 'react';

const EditEntry: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchEntry = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/journal/${id}`);
        const entry = await response.json();
        setTitle(entry[0]?.title || '');
        setContent(entry[0]?.content || '');
      } catch (error) {
        console.error('Error fetching entry:', error);
      }
    };

    fetchEntry();
  }, [id]);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`http://localhost:3000/api/journal/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      console.log('Entry updated successfully!', data);
    } catch (error) {
      console.error('Error updating entry:', error);
    } finally {
      setIsSubmitting(false);
      // Redirect to entry page after successful update
    }

  };

  return (
    <div>
      <h1>Edit Journal Entry {id}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title (optional)"
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            placeholder="Write your entry here..."
            rows={10}
          />
        </div>
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? 'Updating...' : 'Update'}
        </button>
      </form>
    </div>
  );
};

export default EditEntry;
