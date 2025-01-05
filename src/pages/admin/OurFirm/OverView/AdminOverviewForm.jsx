import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function AdminOverviewForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
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
      const res = await axios.get(`/api/overviews/${id}`);
      setFormData({
        title: res.data.title || "",
        content: res.data.content || "",
      });
    } catch (err) {
      console.error("Error loading overview:", err);
      setError("Could not load overview data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEditMode) {
        await axios.put(`/api/overviews/${id}`, formData);
      } else {
        await axios.post("/api/overviews", formData);
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
            name="content"
            className="w-full border p-2 rounded"
            value={formData.content}
            onChange={handleChange}
            rows={10}
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
