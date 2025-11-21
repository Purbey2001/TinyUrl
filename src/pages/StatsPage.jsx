import { useParams } from "react-router-dom";
import { useState, useEffect,} from "react";
import API from "../services/apis"
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";


export default function StatsPage({setLinks}) {
  const navigate = useNavigate();
  const { code } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    API.get(`/api/links/${code}`)
      .then((res) => setData(res.data))
      .catch(() => setData(null));
  }, [code]);

  const deleteLink = async (code) => {
    await API.delete(`/api/links/${code}`);
    navigate("/");
  };

  if (!data) return <Loader/>;

  return (
    <div className="max-w-11/12 bg-white rounded-lg flex flex-col items-center p-4 gap-2">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-600">
            <th className="border p-2" colSpan="2">
              Stats for {data.code}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">
              Original URL:
            </td>
            <td className="border p-2 wrap-anywhere">
              {data.url}
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              Total Clicks:
            </td>
            <td className="border p-2">
              {data.clicks}
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              Created At:
            </td>
            <td className="border p-2">
              {new Date(data.createdAt).toLocaleString()}
            </td>
          </tr>
          <tr>
            <td className="border p-2">
              Last Clicked:
            </td>
            <td className="border p-2">
              {data.lastClicked ? new Date(data.lastClicked).toLocaleString() : "-"}
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => deleteLink(data.code)} className="min-w-[30%] bg-red-600 text-white text-xl font-semibold px-4 py-2 rounded">
        Delete
      </button>
    </div>
  );
}
