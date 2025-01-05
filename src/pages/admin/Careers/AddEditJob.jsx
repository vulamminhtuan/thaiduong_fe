import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function AddEditJob({ mode }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    requirements: [""],
    address: "",
    phone: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && id) {
      fetchJob(id);
    }
  }, [mode, id]);

  const fetchJob = async (jobId) => {
    try {
      const response = await axios.get(`/api/jobs/${jobId}`);
      setForm(response.data);
    } catch (err) {
      setError("Error fetching job data.");
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
  
    try {
      const payload = { ...form, requirements: form.requirements.filter(req => req.trim() !== "") }; 
      if (mode === "edit") {
        await axios.put(`/api/jobs/${id}`, payload);
      } else {
        await axios.post("/api/jobs", payload);
      }
      navigate("/admin/jobs");
    } catch (err) {
      setError("Error saving job data.");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white shadow rounded p-6">
      <h2 className="text-lg font-semibold mb-4">
        {mode === "edit" ? "Edit Job" : "Add New Job"}
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            value={form.description}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Requirements</label>
          {form.requirements.map((req, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={req}
                onChange={(e) => {
                  const newRequirements = [...form.requirements];
                  newRequirements[index] = e.target.value;
                  setForm((prev) => ({ ...prev, requirements: newRequirements }));
                }}
                className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              {form.requirements.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const newRequirements = form.requirements.filter((_, i) => i !== index);
                    setForm((prev) => ({ ...prev, requirements: newRequirements }));
                  }}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => setForm((prev) => ({ ...prev, requirements: [...prev.requirements, ""] }))}
            className="mt-2 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            Add Requirement
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleInputChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              saving ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/jobs")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEditJob;
