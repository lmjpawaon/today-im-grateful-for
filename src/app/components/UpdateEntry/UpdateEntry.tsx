"use client"
import { editEntry, getSpecificEntry } from '../../actions';
import { useEffect, useState } from 'react';

const UpdateEntry: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { id } = params;
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    useEffect(() => {
      const fetchEntry = async () => {
        try {
          const entry = await getSpecificEntry(id)
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
  
      const data = {
        title: title,
        content: content
      };
      
      try {
        await editEntry(id,data)
  
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
}

export default UpdateEntry