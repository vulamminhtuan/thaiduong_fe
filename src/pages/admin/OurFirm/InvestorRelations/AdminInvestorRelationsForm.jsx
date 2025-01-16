import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminInvestorRelationsForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    id: null,
    title: { en: "", vi: "" },
    content: { en: "", vi: "" },
    date: "",            
    imageUrl: "",   
    link: "",     
  });

  const [imageFile, setImageFile] = useState(null);
  const [linkFile, setLinkFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      fetchDataById();
    }
  }, [isEditMode]);

  useEffect(() => {
      return () => {
        if (imagePreview) {
          URL.revokeObjectURL(imagePreview);
        }
      };
    }, [imagePreview]);

  const fetchDataById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`https://thaiduong-be.onrender.com/api/investor-relations/${id}`);
      setFormData({
        title: {
          vi: res.data.titleVi || "", 
          en: res.data.titleEn || "",
        },
        content: {
          vi: res.data.contentVi || "", 
          en: res.data.contentEn || "",
        },
        date: res.data.date || "",
        imageUrl: res.data.imageUrl || "",
        link: res.data.link || "",
      });
    } catch (err) {
      console.error("Error loading item:", err);
      setError("Could not load item data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, field, lang = null) => {
    const { name, value } = e.target;
    if (lang) {
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [lang]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleLinkFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLinkFile(e.target.files[0]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // // Tạo FormData object
      // const formDataToSend = new FormData();
      
      // // Thêm các trường dữ liệu vào FormData dưới dạng chuỗi JSON
      // formDataToSend.append("title", JSON.stringify(formData.title));
      // formDataToSend.append("content", JSON.stringify(formData.content));
      // formDataToSend.append("date", formData.date || new Date().toISOString());

      let insertData = {
        titleVi: formData.title.vi,
        titleEn: formData.title.en,
        contentVi: formData.content.vi,
        contentEn: formData.content.en,
        date: formData.date,
        imageUrl: imageFile,
        link: linkFile,
      };
      
      
      
      if (isEditMode) {
        console.log(insertData);
        await axios.put(`https://thaiduong-be.onrender.com/api/investor-relations/${id}`, insertData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        console.log(insertData);
        
        await axios.post("https://thaiduong-be.onrender.com/api/investor-relations", insertData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/admin/our-firm/investor-relations");

    } catch (err) {
      setError(err.response?.data || "Lỗi lưu dữ liệu.");
      console.error("Save error:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">
        {isEditMode ? "Edit InvestorRelations" : "Add New InvestorRelations"}
      </h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">Title</label>
          {Object.keys(formData.title).map((lang) => (
            <input
              key={lang}
              type="text"
              placeholder={`Title (${lang.toUpperCase()})`}
              value={formData.title[lang]}
              onChange={(e) => handleChange(e, "title", lang)}
              className="w-full border p-2 rounded mb-2"
              required
            />
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          {Object.keys(formData.content).map((lang) => (
            <textarea
              key={lang}
              placeholder={`Content (${lang.toUpperCase()})`}
              value={formData.content[lang]}
              onChange={(e) => handleChange(e, "content", lang)}
              className="w-full border p-2 rounded mb-2"
              rows="4"
            />
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={(e) => handleChange(e, "date")}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            className="w-full border p-2 rounded"
            required={!isEditMode} // Yêu cầu upload hình ảnh khi tạo mới
          />
          {imagePreview ? (
            <div className="mt-2">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-32 h-32 object-cover border"
              />
            </div>
          ) : formData.imageUrl && !imageFile ? (
            <div className="mt-2">
              <img
                src={`${formData.imageUrl}`}
                alt="Current"
                className="w-32 h-32 object-cover border"
              />
            </div>
          ) : null}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Upload File (Link)
          </label>
          <input
            type="file"
            onChange={handleLinkFileChange}
            className="w-full border p-2 rounded"
          />
          {formData.link && !linkFile ? (
            <div className="mt-2">
              <a
                href={`${formData.link}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                Open Existing File
              </a>
            </div>
          ) : linkFile ? (
            <div className="mt-2">
              <p className="text-gray-600">
                Chosen file: {linkFile.name}
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="px-3 py-1 bg-blue-600 text-white rounded w-24 text-center"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate("/admin/our-firm/investor-relations")}
            className="px-3 py-1 bg-gray-400 text-white rounded w-24 text-center"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminInvestorRelationsForm;
