"use client"

import React, { useState } from "react";
import { createEntry } from "../../actions";
import BackButton from "../Reusable/BackButton";

const EntryForm: React.FC = () => {
    const [title, setTitle] = useState(""); // For storing title
    const [content, setContent] = useState(""); // For storing content
    const [isSubmitting, setIsSubmitting] = useState(false); // For loading state
  
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
  
      try{
        await createEntry(data)
        // Handle successful creation (e.g., navigate, display success message)
        console.log("Entry created successfully!", data);
        setIsSubmitting(false);
        // Reset form
        setTitle("");
        setContent("");
      } catch (error) {
        console.error("Error creating entry:", error);
        setIsSubmitting(false);
        // Handle error (e.g., display error message)
      }
    };
  
    return (
        <div className="max-w-2xl mx-auto mt-8">
        <BackButton/>
        <h1>Create New Entry</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="title"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title (optional)"
              className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <textarea
              id="content"
              value={content}
              onChange={handleContentChange}
              placeholder="Write your entry here..."
              rows={10}
              className="border p-2 w-full rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          >
            {isSubmitting ? "Submitting..." : "Create"}
          </button>
        </form>
      </div>
    );
}

export default EntryForm