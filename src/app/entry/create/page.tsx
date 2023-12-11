import EntryForm from "../../components/CreateEntry/EntryForm";

const CreateEntry: React.FC = () => {
  // const [title, setTitle] = useState(""); // For storing title
  // const [content, setContent] = useState(""); // For storing content
  // const [isSubmitting, setIsSubmitting] = useState(false); // For loading state

  // const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setTitle(event.target.value);
  // };

  // const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setContent(event.target.value);
  // };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);

  //     const data = {
  //       title: title,
  //       content: content
  //     };

  //   try{
  //     await createEntry(data)
  //     // Handle successful creation (e.g., navigate, display success message)
  //     console.log("Entry created successfully!", data);
  //     setIsSubmitting(false);
  //     // Reset form
  //     setTitle("");
  //     setContent("");
  //   } catch (error) {
  //     console.error("Error creating entry:", error);
  //     setIsSubmitting(false);
  //     // Handle error (e.g., display error message)
  //   }
  // };

  return (
    <>
    <EntryForm/>
    </>
  //   <div>
  //     <h1>Create New Entry</h1>
  //     <form onSubmit={handleSubmit}>
  //       <div>
  //         <label htmlFor="title">Title:</label>
  //         <input
  //           type="text"
  //           id="title"
  //           value={title}
  //           onChange={handleTitleChange}
  //           placeholder="Enter a title (optional)"
  //         />
  //       </div>
  //       <div>
  //         <label htmlFor="content">Content:</label>
  //         <textarea
  //           id="content"
  //           value={content}
  //           onChange={handleContentChange}
  //           placeholder="Write your entry here..."
  //           rows={10}
  //         />
  //       </div>
  //       <button disabled={isSubmitting} type="submit">
  //         {isSubmitting ? "Submitting..." : "Create"}
  //       </button>
  //     </form>
  //   </div>
  );
};

export default CreateEntry;
