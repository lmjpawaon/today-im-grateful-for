"use client"
import { editEntry, getSpecificEntry } from '../../actions';
import { useEffect, useState } from 'react';
import { lato, raleway } from '../../../styles/fonts';

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
      <div className="max-w-2xl mx-auto mt-8">
        <h1 className={`${lato.variable} text-2xl font-bold mb-4`}>Update Entry</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title (optional)"
              className={`${lato.variable} font-extrabold border p-2 w-full rounded-md focus:outline-none focus:ring focus:border-accent-300`}
            />
          </div>
          <div className="mb-4">
            <textarea
              id="content"
              value={content}
              style={{fontFamily: `${raleway.variable}`}}
              onChange={handleContentChange}
              placeholder="Write your entry here..."
              rows={10}
              className={`${raleway.variable} border p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300`}
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {isSubmitting ? "Submitting..." : "Update"}
          </button>
        </form>
      </div>
    );
}

export default UpdateEntry