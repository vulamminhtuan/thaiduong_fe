import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminBusinessPrincipleForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    titles: { en: "", vi: "" },
    descriptions: { en: "", vi: "" },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchDataById();
    }
  }, [isEditMode]);

  const fetchDataById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/business-principles/${id}`);
      setFormData({
        titles: res.data.titles || { en: "", vi: "" },
        descriptions: res.data.descriptions || { en: "", vi: "" },
      });
    } catch (err) {
      console.error("Error loading item:", err);
      setError("Could not load item data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, field, lang) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEditMode) {
        await axios.put(`/api/business-principles/${id}`, formData);
      } else {
        await axios.post("/api/business-principles", formData);
      }
      navigate("/admin/our-firm/business-principles");
    } catch (err) {
      console.error("Save error:", err);
      setError("Error saving data.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit BusinessPrinciple" : "Add New BusinessPrinciple"}
      </h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSave} className="space-y-4 max-w-md">
      <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          {Object.keys(formData.titles).map((lang) => (
            <div key={lang} className="mb-2">
              <input
                type="text"
                placeholder={`Title (${lang.toUpperCase()})`}
                value={formData.titles[lang]}
                onChange={(e) => handleChange(e, "titles", lang)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ))}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          {Object.keys(formData.descriptions).map((lang) => (
            <div key={lang} className="mb-2">
              <textarea
                placeholder={`Description (${lang.toUpperCase()})`}
                rows={4}
                value={formData.descriptions[lang]}
                onChange={(e) => handleChange(e, "descriptions", lang)}
                className="w-full border p-2 rounded"
                required
              />
            </div>
          ))}
        </div>

        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
          Save
        </button>

        <button
          type="button"
          onClick={() => navigate("/admin/our-firm/business-principles")}
          className="ml-2 px-3 py-1 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AdminBusinessPrincipleForm;
