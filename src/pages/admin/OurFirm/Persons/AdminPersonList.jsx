import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPersonList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/persons");
      setItems(res.data.content || []);
    } catch (err) {
      console.error("Error fetching Persons:", err);
      setError("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this person?")) return;
    try {
      await axios.delete(`/api/persons/${id}`);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Error deleting item.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Manage Persons</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p>Loading Persons...</p>}

      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/our-firm/persons/new")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          New Item
        </button>
      </div>

      <table className="min-w-full bg-white border table-auto">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left w-1/12">ID</th>
            <th className="py-2 px-4 border-b text-left w-8/12">Username</th>
            <th className="py-2 px-4 border-b text-left w-3/12">Position</th>
            <th className="py-2 px-4 border-b text-left w-1/12">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-left">{item.id}</td>
              <td className="py-2 px-4 border-b text-left">{item.username}</td>
              <td className="py-2 px-4 border-b">{item.position?.en}</td>
              <td className="py-2 px-4 border-b text-left">
                <button
                  onClick={() => navigate(`/admin/our-firm/persons/${item.id}`)}
                  className="px-2 py-1 bg-yellow-400 text-white rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPersonList;
