import React, { useState } from 'react';
import axios from 'axios';
import { adminProductConfig } from './adminProductConfig';
import { useNavigate, useParams } from 'react-router-dom';

function NewItem() {
  const navigate = useNavigate();
  const { productType } = useParams();
  const [form, setForm] = useState({
    title: { en: '', vi: '' },
    content: { en: '', vi: '' },
    image: null,
  });
    const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const currentConfig = adminProductConfig.find((item) => item.path === productType);

  const getDtoName = (productType) => {
    switch(productType) {
      case 'fund-management':
        return 'fundManagementDto';
      case 'investment-managed':
        return 'investmentManagedAccountDto';
      case 'investment-strategy':
        return 'investmentStrategyAdvisoryDto';
      case 'incidental-investment':
        return 'incidentalInvestmentServicesDto';
      default:
        return 'dto';
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      const dto = {
        title: {
          en: form.title.en,
          vi: form.title.vi
        },
        content: {
          en: form.content.en,
          vi: form.content.vi
        }
      };
      
      const dtoName = getDtoName(productType);
      formData.append(dtoName, new Blob([JSON.stringify(dto)], {
        type: 'application/json'
      }));

      if (form.image) {
        formData.append('image', form.image);
      }

      await axios.post(currentConfig.endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('Product created successfully!');
      setForm({ title: { en: '', vi: '' }, content: { en: '', vi: '' }, image: null });

      setTimeout(() => {
        navigate(`/admin/products/${productType}`);
      }, 2000);
    } catch (err) {
      setError(`Error saving product: ${err.message}`);
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

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Create New Product</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <form onSubmit={handleSave} className="bg-white p-4 rounded shadow">
      <div className="mb-2">
          <label className="block text-sm font-medium">Title (English):</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.title.en}
            onChange={(e) => handleInputChange(e, 'title', 'en')}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Title (Vietnamese):</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={form.title.vi}
            onChange={(e) => handleInputChange(e, 'title', 'vi')}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Content (English):</label>
          <textarea
            className="border p-2 w-full rounded"
            rows={3}
            value={form.content.en}
            onChange={(e) => handleInputChange(e, 'content', 'en')}
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium">Content (Vietnamese):</label>
          <textarea
            className="border p-2 w-full rounded"
            rows={3}
            value={form.content.vi}
            onChange={(e) => handleInputChange(e, 'content', 'vi')}
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
