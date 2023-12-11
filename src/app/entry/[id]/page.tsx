import SpecificEntry from "../../components/SpecificEntry/SpecificEntry";

const EntryDetails: React.FC<{ params: { id: string } }> = ({ params }) => {
  const id = params.id;

  return (
    <>
      <SpecificEntry params={{id}}/>
    </>
  );
};

export default EntryDetails;