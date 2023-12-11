import Link from "next/link";
import type { JournalType } from "../lib/types/JournalType";
import { getAllEntries } from "./actions";
import AddButton from "./components/HomePage/AddButton";
import DisplayEntry from "./components/HomePage/DisplayEntry";

const Home: React.FC = async () => {

  return (
    <>
      <DisplayEntry/>
      <AddButton/>
    </>
  );
};


export default Home;