import Loader from "./Loader"
import Table from "./Table";

export default function LinksTable({ links, loading }) {

  return (
    <div className="bg-white rounded-lg flex flex-col items-center p-4 gap-2">
        {
            loading ? <Loader/> : (links.length===0 ? <p className="text-2xl text-black font-semibold"> No Links yet </p>:<Table links={links}/>)
        }
    </div>
  );
}