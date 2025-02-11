import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminInvestorRelationsList() {
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
        const res = await axios.get("https://thaiduong-be.onrender.com/api/investor-relations?page=0&size=9999");
        setItems(res.data.content || []);
    } catch (err) {
      console.error("Error fetching InvestorRelations:", err);
      setError("Error loading data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await axios.delete(`https://thaiduong-be.onrender.com/api/investor-relations/${id}`);
      setItems((prev) => prev.filter((inv) => inv.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      setError("Error deleting item.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Manage InvestorRelations</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {loading && <p>Loading InvestorRelations...</p>}

      <div className="mb-4">
        <button
          onClick={() => navigate("/admin/our-firm/investor-relations/new")}
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
            <th className="py-2 px-4 border-b">Content </th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">ImageUrl</th>
            <th className="py-2 px-4 border-b">Link</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{item.id}</td>
              <td className="py-2 px-4 border-b">{item.titleVi}</td>
              <td className="py-2 px-4 border-b">{item.contentVi}</td>
              
              <td className="py-2 px-4 border-b">
                {item.date ? new Date(item.date).toLocaleDateString("vi-VN") : ""}
                </td>
                <td className="px-4 py-3">
                      {item.imageUrl ? (
                        <img
                          src={
                            item.imageUrl.startsWith("http")
                              ? item.imageUrl
                              : item.imageUrl
                          }
                          alt={item.title}
                        
                          className="h-16 w-16 object-cover rounded"
                        />
                      ) : (
                        <span>Không có ảnh</span>
                      )}
                    </td>
              <td className="py-2 px-4 border-b">
                {item.link ? (
                    <a
                    // href={`https://thaiduong-be.onrender.com/api/files/${item.link
                    //       .split("\\")
                    //       .pop()}`}
                          href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-blue-600 hover:text-blue-800"
                    >
                    Open Link
                    </a>
                ) : (
                    "No link"
                )}
                </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() =>
                    navigate(`/admin/our-firm/investor-relations/${item.id}`)
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

export default AdminInvestorRelationsList;
