import React, { useState } from 'react';
import axios from 'axios';
import { adminProductConfig } from './adminProductConfig';
import { useNavigate, useParams } from 'react-router-dom';

function NewItem() {
  const navigate = useNavigate();
  const { productType } = useParams();
  const [form, setForm] = useState({ title: '', content: '', image: null });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const currentConfig = adminProductConfig.find((item) => item.path === productType);

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('content', form.content);
      if (form.image) {
        formData.append('image', form.image);
      }

      await axios.post(currentConfig.endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSuccess('Product created successfully!');
      setForm({ title: '', content: '', image: null });

      setTimeout(() => {
        navigate(`/admin/products/${productType}`);
      }, 2000);
    } catch (err) {
      setError(`Error saving product: ${err.message}`);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create New Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSave} className="bg-white p-4 rounded shadow">
        <div className="mb-2">
          <label className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Content:</label>
          <textarea
            className="border p-2 w-full rounded"
            rows={3}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Image:</label>
          <input
            type="file"
            accept="image/*"
            className="border p-2 w-full rounded"
            onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default NewItem;
