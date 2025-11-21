import { useState, useEffect } from "react";
import LinkForm from "../components/LinkForm";
import LinksTable from "../components/LinksTable";
import API from "../services/apis"

export default function Dashboard() {
  
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLinks = async () => {
    try {
      const res = await API.get("/api/links");
      setLinks(res.data.links);
    } catch (error) {
      console.log("Error fetching links",error);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchLinks();
  }, []);

  return (
    <div className="w-11/12 md:w-9/12 mx-auto flex flex-col gap-8">
      <LinkForm fetchLinks={fetchLinks} />
      <LinksTable links={links} loading={loading} />
    </div>
  );
}
