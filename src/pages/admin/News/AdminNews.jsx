import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function AdminNews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    id: null,
    title: "",
    imageUrl: "",
    description: "",
    content: "",
    createdAt: "", 
  });

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const fetchItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("/api/news?page=0&size=9999");
      const data = Array.isArray(response.data.news) ? response.data.news : [];
      setItems(data);
    } catch (err) {
      setError("Error loading news data.");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (
      selectedIds.length > 0 &&
      window.confirm("Are you sure you want to delete the selected news?")
    ) {
      try {
        if (selectedIds.length === 1) {
          // Xóa một phần tử
          await axios.delete(`/api/news/${selectedIds[0]}`);
        } else {
          // Xóa nhiều phần tử
          await axios.post("/api/news/delete-batch", { ids: selectedIds });
        }
        fetchItems();
        setSelectedIds([]); // Reset danh sách được chọn
      } catch (err) {
        console.error("Delete error:", err);
        setError("Error deleting selected news.");
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      let imageUrl = form.imageUrl;
  
      // Upload ảnh nếu có file mới
      if (form.imageFile) {
        const formData = new FormData();
        formData.append("image", form.imageFile);
  
        try {
          const uploadResponse = await axios.post("/api/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          
          // Lấy đường dẫn ảnh từ response
          imageUrl = uploadResponse.data.imageUrl;
          console.log("Upload success:", imageUrl);
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          setError("Error uploading image.");
          return;
        }
      }
  
      const currentTimestamp = new Date().toISOString();
      const updatedForm = {
        ...form,
        imageUrl: imageUrl, // Sử dụng URL mới nếu có upload, giữ URL cũ nếu không
        createdAt: form.createdAt || currentTimestamp,
      };
  
      if (isEditing) {
        await axios.put(`/api/news/${form.id}`, updatedForm);
      } else {
        await axios.post("/api/news", updatedForm);
      }
  
      // Reset form và chuyển hướng
      fetchItems();
      setForm({
        id: null,
        title: "",
        imageFile: null,
        imageUrl: "",
        description: "",
        content: "",
        createdAt: "",
      });
      setIsEditing(false);
      navigate("/admin/news");
    } catch (err) {
      console.error("Save error:", err);
      setError("Error saving news data.");
    }
  };

  const handleDelete = async (id) => {
  if (window.confirm('Are you sure you want to delete this news?')) {
    try {
      await axios.delete(`/api/news/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
      setError("Error deleting news.");
    }
  }
};

  const handleEdit = (item) => {
    setForm(item);
    setIsEditing(true);
    navigate("/admin/news/edit");
  };

  const handleAddNew = () => {
    setForm({
      id: null,
      title: "",
      imageUrl: "",
      description: "",
      content: "",
      createdAt: "",
    });
    setIsEditing(false);
    navigate("/admin/news/add");
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(items.map((item) => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const isAddingOrEditing =
    location.pathname.includes("add") || location.pathname.includes("edit");

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-normal">News</h1>
        <div className="flex gap-2">
          <button
            onClick={handleDeleteSelected}
            className="px-3 py-1.5 text-sm bg-red-600 text-white rounded flex items-center gap-1"
          >
            <span>Delete Selected</span>
          </button>
          <button
            onClick={handleAddNew}
            className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded flex items-center gap-1"
          >
            <span>+ Add news</span>
          </button>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {isAddingOrEditing ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">
            {isEditing ? "Edit News" : "Add New News"}
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-1">
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
              <label htmlFor="imageFile" className="block text-sm font-medium mb-1">
                Upload Image
              </label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setForm((prev) => ({ ...prev, imageFile: file }));
                    const previewUrl = URL.createObjectURL(file);
                    setImagePreview(previewUrl);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {(imagePreview || form.imageUrl) && (
                <img
                  src={imagePreview || form.imageUrl}
                  alt="Preview"
                  className="mt-2 max-w-xs h-40 object-cover rounded shadow"
                />
              )}
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={2}
                value={form.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-1">
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

            <div>
              <label htmlFor="createdAt" className="block text-sm font-medium mb-1">
                Created At
              </label>
              <input
                id="createdAt"
                type="text"
                name="createdAt"
                value={form.createdAt || "Will be generated on save"}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                readOnly
              />
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/news")}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="w-full overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left font-medium text-sm">
                    Select
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-sm">ID</th>
                  <th className="px-4 py-3 text-left font-medium text-sm">IMAGE</th>
                  <th className="px-4 py-3 text-left font-medium text-sm">
                    Title
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-sm">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-sm">
                    Content
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-sm">
                    Created At
                  </th>
                  <th className="px-4 py-3 text-left font-medium text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        className="rounded"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                    </td>
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3">
                      {item.imageUrl ? (
                        <img
                          src={
                            item.imageUrl.startsWith("http")
                              ? item.imageUrl
                              : `http://localhost:8080/api/images/${item.imageUrl}`
                          }
                          alt={item.title}
                        
                          className="h-16 w-16 object-cover rounded"
                        />
                      ) : (
                        <span>Không có ảnh</span>
                      )}
                    </td>
                    <td className="px-4 py-3">{item.title}</td>
                    <td className="px-4 py-3">
                      {item.description.length > 50
                        ? `${item.description.substring(0, 50)}...`
                        : item.description}
                    </td>
                    <td className="px-4 py-3">
                      {item.content.length > 50
                        ? `${item.content.substring(0, 50)}...`
                        : item.content}
                    </td>
                    <td className="px-4 py-3">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleString("vi-VN", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                          })
                        : "Ngày không hợp lệ"}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminNews;
