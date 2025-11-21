import { useState } from "react";
import API from "../services/apis";
import { toast } from "react-toastify";

export default function LinkForm({fetchLinks}) {
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const validateUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch(error) {
      console.log(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateUrl(url)) {
      toast.error("Invalid URL");
      setLoading(false);
      return;
    }
    try {
      const res = await API.post("/api/links", {
        url,
        code: code || undefined,
      });
      setUrl("");
      setCode("");
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Code already exists");
        console.log(error.message)
      } else {
        toast.error("Failed to create link");
        console.log(error.message);
      }
    }
    fetchLinks();
    setLoading(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg flex flex-col items-center p-4 gap-2"
    >
        <p className="text-xl font-semibold">Create New Short Link</p>
        <label className="w-full flex flex-col gap-1 text-xl">
            Long URL:
            <input
            type="text"
            required
            placeholder="Enter long URL"
            className="w-full border p-2 rounded"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            />
        </label>
        <label className="w-full flex flex-col gap-1 text-xl">
            Custom Code (optional):
            <input
            type="text"
            placeholder="Enter Custom code between 6-8 character"
            className="w-full border p-2 rounded"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            />
        </label>
        <button 
        disabled={loading}
        className="min-w-[30%] bg-blue-600 text-white text-xl font-semibold px-4 py-2 rounded">
          {loading ? `Creating...` : 'Create'}
        </button>
    </form>
  );
}
