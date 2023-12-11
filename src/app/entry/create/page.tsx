import BackButton from "../../components/Reusable/BackButton";
import EntryForm from "../../components/CreateEntry/EntryForm";

const CreateEntry: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between mb-8 p-4">
        <BackButton />

        <div className="w-full p-4">
          <EntryForm/>
        </div>
      </div>
    </div>
  );
};

export default CreateEntry;
