import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function AdminOverviewForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    content: { en: "", vi: "" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const isEditMode = Boolean(id); 


  useEffect(() => {
    if (isEditMode) {
      fetchOverviewById();
    }
  }, [isEditMode]);

  const fetchOverviewById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://thaiduong-be.onrender.com/api/overviews/${id}`);
      setFormData({
        content: res.data.content || { en: "", vi: "" },
      });
    } catch (err) {
      console.error("Error loading overview:", err);
      setError("Could not load overview data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, lang) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      content: { ...prev.content, [lang]: value },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEditMode) {
        await axios.put(`https://thaiduong-be.onrender.com/api/overviews/${id}`, formData);
      } else {
        await axios.post("https://thaiduong-be.onrender.com/api/overviews", formData);
      }
      navigate("/admin/our-firm/overviews");
    } catch (err) {
      console.error("Save error:", err);
      setError("Error saving data.");
    }
  };

  if (loading) {
    return <div>Loading overview...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit Overview" : "Add New Overview"}
      </h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 text-sm font-medium">Content</label>
          <textarea
            placeholder="Content in English"
            value={formData.content.en}
            onChange={(e) => handleChange(e, "en")}
            className="w-full border p-2 rounded"
            rows={6}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Content (Vietnamese)</label>
          <textarea
            placeholder="Content in Vietnamese"
            value={formData.content.vi}
            onChange={(e) => handleChange(e, "vi")}
            className="w-full border p-2 rounded"
            rows={6}
            required
          />
        </div>

        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Save
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/our-firm/overviews")}
          className="ml-2 px-3 py-1 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AdminOverviewForm;
