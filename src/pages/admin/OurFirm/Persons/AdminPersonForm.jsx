import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminPersonForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    username: "",
    position: { en: "", vi: "" },
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
      const res = await axios.get(`https://thaiduong-be.onrender.com/api/persons/${id}`);
      setFormData({
        username: res.data.username || "",
        position: res.data.position || { en: "", vi: "" },
      });
    } catch (err) {
      console.error("Error loading person:", err);
      setError("Could not load person data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, field, lang = null) => {
    const { value } = e.target;
    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      if (isEditMode) {
        await axios.put(`https://thaiduong-be.onrender.com/api/persons/${id}`, formData);
      } else {
        await axios.post("https://thaiduong-be.onrender.com/api/persons", formData);
      }
      navigate("/admin/our-firm/persons");
    } catch (err) {
      console.error("Save error:", err);
      setError("Error saving data.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit Person" : "Add New Person"}
      </h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            name="username"
            className="w-full border p-2 rounded"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Position</label>
          <div>
            <label className="block text-sm font-medium">English</label>
            <input
              type="text"
              placeholder="Position in English"
              value={formData.position.en}
              onChange={(e) => handleChange(e, "position", "en")}
              className="w-full border p-2 rounded mb-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Vietnamese</label>
            <input
              type="text"
              placeholder="Position in Vietnamese"
              value={formData.position.vi}
              onChange={(e) => handleChange(e, "position", "vi")}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">
          Save
        </button>
        <button
          type="button"
          onClick={() => navigate("/admin/our-firm/persons")}
          className="ml-2 px-3 py-1 bg-gray-400 text-white rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AdminPersonForm;
