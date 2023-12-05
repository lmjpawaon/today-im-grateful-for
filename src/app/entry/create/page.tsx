"use client"

import { redirect } from "next/navigation";
import React, { useState } from "react";

const CreateEntry: React.FC = () => {
  const [content, setContent] = useState(""); // For storing user input
  const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Replace this with your actual API call or Prisma client usage
      const response = await fetch("http://localhost:3000/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }), // Send content data
      });

      const data = await response.json();

      // Handle successful creation (e.g., navigate, display success message)
      console.log("Entry created successfully!", data);
      setIsSubmitting(false);
      // Reset form
      setContent("");
    } catch (error) {
      console.error("Error creating entry:", error);
      setIsSubmitting(false);
      // Handle error (e.g., display error message)
    }
  };

  return (
    <div>
      <h1>Create New Entry</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Write your entry here..."
          rows={10}
        />
        <button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Submitting..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateEntry;
