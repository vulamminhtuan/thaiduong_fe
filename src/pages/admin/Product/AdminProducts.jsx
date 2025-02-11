import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { adminProductConfig } from './adminProductConfig';

function AdminProducts() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [form, setForm] = useState({
    title: { en: '', vi: '' },
    content: { en: '', vi: '' },
    image: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const { productType } = useParams();
  const currentConfig = adminProductConfig.find((item) => item.path === productType);
   useEffect(() => {
    if (!currentConfig) {
      setError('Không tìm thấy loại sản phẩm này.');
      setLoading(false);
    } else {
      fetchData();
    }
  }, [currentConfig]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`https://thaiduong-be.onrender.com${currentConfig.endpoint}`);
      setData(res.data[0] || null);
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let imageUrl = form.image;

      // Upload image if it's a File object
      if (form.image instanceof File) {
        const formData = new FormData();
        formData.append('image', form.image);

        const uploadResponse = await axios.post('https://thaiduong-be.onrender.com/api/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        imageUrl = uploadResponse.data.imageUrl;
      }

      // Prepare product data
      const productData = {
        title: form.title,
        content: form.content,
        imageURL: imageUrl
      };

      if (isEditing) {
        await axios.put(`https://thaiduong-be.onrender.com${currentConfig.endpoint}/${editId}`, productData);
      } else {
        await axios.post(`https://thaiduong-be.onrender.com${currentConfig.endpoint}`, productData);
      }

      await fetchData();
      setForm({ title: { en: '', vi: '' }, content: { en: '', vi: '' }, image: null});
      setIsEditing(false);
      setEditId(null);
      setShowEditModal(false);
      setImagePreview(null);

    } catch (err) {
      setError(`Save error: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!data) return;

    try {
      await axios.delete(`https://thaiduong-be.onrender.com${currentConfig.endpoint}/${data.id}`);
      setData(null);
      setShowConfirmation(false);
    } catch (err) {
      setError(`Delete error: ${err.message}`);
    }
  };

  const handleEdit = (item) => {
    setForm({
      title: item.title,
      content: item.content,
      image: item.imageURL
    });
    setIsEditing(true);
    setEditId(item.id);
    setShowEditModal(true);
    if (item.imageURL) {
      const imageUrl = item.imageURL.startsWith("https") 
        ? item.imageURL 
        : item.imageURL;
      setImagePreview(imageUrl);
    }
  };

  const handleInputChange = (e, field, lang) => {
    const { value } = e.target;
    setForm((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [lang]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNewItem = () => {
    if (data) {
      setShowConfirmation(true);
    } else {
      navigate(`/admin/products/${productType}/new`);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

    return (
      <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage {currentConfig?.title}</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleNewItem}
        >
          New Item
        </button>
      </div>

      {data ? (
        <div className="bg-white p-4 rounded shadow flex flex-col items-center space-y-2 w-80">
          {/* Tựa đề */}
          <h3 className="text-center text-lg font-semibold">{data.title.en}</h3>

          {/* Hình ảnh */}
          {data.imageURL && (
            <img
              // src={`${process.env.REACT_APP_API_URL || ''}${data.imageURL}`}
              src={data.imageURL.startsWith("https") ? data.imageURL : data.imageURL}
              alt={data.title}
              className="w-72 h-48 object-cover rounded"
            />
          )}

          {/* Nội dung */}
          <p className="text-sm text-gray-700 text-center">{data.content.en}</p>

          {/* Các nút thao tác */}
          <div className="flex justify-between w-full gap-2">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full"
              onClick={() => setShowConfirmation(true)}
            >
              Delete
            </button>
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
              onClick={() => handleEdit(data)}
            >
              Update
            </button>
          </div>
        </div>
      ) : (
        <p>No product available. Click "New Item" to create one.</p>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Edit Item' : 'Add New Item'}
            </h2>
            <form onSubmit={handleSave}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Title (EN)
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title.en}
                  onChange={(e) => handleInputChange(e, 'title', 'en')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                Title (VN)
                </label>
                <input
                  type="text"
                  name="title"
                  value={form.title.vi}
                  onChange={(e) => handleInputChange(e, 'title', 'vi')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Content (EN)
                </label>
                <textarea
                  name="content"
                  value={form.content.en}
                  onChange={(e) => handleInputChange(e, 'content', 'en')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Content (VN)
                </label>
                <textarea
                  name="content"
                  value={form.content.vi}
                  onChange={(e) => handleInputChange(e, 'content', 'vi')}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-2 w-full h-40 object-cover rounded"
                  />
                )}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={() => {
                    setShowEditModal(false);
                    setForm({ title: '', content: '', image: null });
                    setIsEditing(false);
                    setImagePreview(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow space-y-4">
            <p>There is an existing product. Do you want to delete it before creating a new one?</p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default AdminProducts;
