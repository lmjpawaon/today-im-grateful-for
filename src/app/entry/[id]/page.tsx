import SpecificEntry from "../../components/SpecificEntry/SpecificEntry";
import BackButton from "../../components/Reusable/BackButton";

const EntryDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const id = params.id;

  return (
  <div className="max-w-2xl mx-auto mt-8">
      <div className="flex justify-between mb-8 p-4">
        {/* BackButton */}
        <BackButton />

        {/* SpecificEntry */}
        <div className="w-full p-4">
          <SpecificEntry params={{ id }} />
        </div>
      </div>
    </div>
  );
};

export default EntryDetails;