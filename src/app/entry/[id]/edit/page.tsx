import UpdateEntry from '../../../components/UpdateEntry/UpdateEntry';
import BackButton from "../../../components/Reusable/BackButton";

const EditEntry: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params;

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between mb-8 p-4">
        <BackButton />

        <div className="w-full p-4">
          <UpdateEntry params={{ id }} />
        </div>
      </div>
    </div>
  );
};

export default EditEntry;
