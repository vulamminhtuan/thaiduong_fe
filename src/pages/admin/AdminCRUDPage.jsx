import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminCRUDPage({ title, apiEndpoint }) {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiEndpoint);
      console.log("API response:", response.data);
      const data = Array.isArray(response.data) ? response.data : [];
      setItems(data);
    } catch (err) {
      setError("Error loading data.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (isEditing) {
        await axios.put(`${apiEndpoint}/${form.id}`, form);
      } else {
        await axios.post(apiEndpoint, form);
      }
      fetchItems();
      setForm({});
      setIsEditing(false);
    } catch (err) {
      setError("Error saving data.");
    }
  };

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiEndpoint}/${id}`);
      fetchItems();
    } catch (err) {
      setError("Error deleting data.");
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{title}</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* FORM */}
      <div className="bg-white shadow rounded p-6">
        <h2 className="text-lg font-semibold mb-4">
          {isEditing ? "Edit Item" : "Add New Item"}
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={form.title || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={4}
              value={form.content || ""}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {isEditing ? "Update" : "Save"}
          </button>
        </form>
      </div>

      {/* LIST ITEMS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.isArray(items) &&
          items.map((item) => (
          <div key={item.id} className="bg-white shadow p-4 rounded space-y-2">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600">
              {item.content.substring(0, 100)}...
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {loading && <p className="text-center">Loading...</p>}
    </div>
  );
}

export default AdminCRUDPage;
