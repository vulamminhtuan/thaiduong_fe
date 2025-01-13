import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminBusinessPrincipleList() {
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
      
      const res = await axios.get("https://thaiduong-be.onrender.com/api/business-principles");
      setItems(res.data.content || []);
    } catch (err) {
      console.error("Error fetching BusinessPrinciples:", err);
      setError("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`https://thaiduong-be.onrender.com/api/business-principles/${id}`);
      setItems((prev) => prev.filter((bp) => bp.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Error deleting item.");
    }
  };

  const getTextForLanguage = (textMap, lang = "en") => {
    return textMap?.[lang] || "N/A";
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Manage BusinessPrinciples</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p>Loading BusinessPrinciples...</p>}

      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/our-firm/business-principles/new")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          New Item
        </button>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{getTextForLanguage(item.titles, "en")}</td>
              <td className="py-2 px-4 border-b">
              {getTextForLanguage(item.descriptions, "en").substring(0, 50)}...
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() =>
                    navigate(`/admin/our-firm/business-principles/${item.id}`)
                  }
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

export default AdminBusinessPrincipleList;
