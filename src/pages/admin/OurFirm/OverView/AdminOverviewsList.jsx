import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminOverviewsList() {
  const [overviews, setOverviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchOverviews();
  }, []);

  const fetchOverviews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/overviews");
      setOverviews(res.data.content || []);
    } catch (err) {
      console.error("Error fetching Overviews:", err);
      setError("Error loading Overviews data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`/api/overviews/${id}`);
      setOverviews((prev) => prev.filter((ov) => ov.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Error deleting item.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Manage Overviews</h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p>Loading Overviews...</p>}

      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/our-firm/overviews/new")} 
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          New Item
        </button>
      </div>

      <table className="min-w-full bg-white border table-auto">
        <thead>
          <tr> 
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Content</th>
            <th className="py-2 px-4 border-b text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {overviews.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b text-left">{item.id}</td>
              <td className="py-2 px-4 border-b text-left">
                {item.content?.slice(0,500)}...
              </td>
              <td className="py-2 px-4 border-b text-left">
                <button
                  onClick={() => navigate(`/admin/our-firm/overviews/${item.id}`)}
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

export default AdminOverviewsList;
