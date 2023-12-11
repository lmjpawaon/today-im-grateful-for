import AddButton from "./components/HomePage/AddButton";
import DisplayEntry from "./components/HomePage/DisplayEntry";

const Home: React.FC = async () => {

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <div className="sm:flex sm:justify-between">
        {/* DisplayEntry */}
        <div className="sm:w-3/4 mb-8 sm:mb-0 p-4">
          <DisplayEntry />
        </div>

        {/* AddButton */}
        <div className="sm:w-1/4">
          <AddButton />
        </div>
      </div>
  </div>
  );
};


export default Home;