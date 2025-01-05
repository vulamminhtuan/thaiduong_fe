import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function AdminInvestorRelationsForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const isEditMode = Boolean(id);

    const [imagePreview, setImagePreview] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    
  
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    content: "",
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
      const res = await axios.get(`/api/investor-relations/${id}`);
      setFormData({
        title: res.data.title || "",
        content: res.data.content || "",
        date: res.data.date || "",       
        imageUrl: res.data.imageUrl || "" ,
        link: res.data.link || "",
      });
    } catch (err) {
      console.error("Error loading item:", err);
      setError("Could not load item data.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
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
      const currentDate = new Date().toISOString();
      
      const updatedFormData = { 
        ...formData,
        imageUrl: imageFile,
        link: linkFile,
        date: currentDate 
      };
    

      console.log(updatedFormData);
      

      if (imageFile) {
        const fileData = new FormData();
        fileData.append("image", imageFile);

        const uploadRes = await axios.post("/api/upload", fileData, {
          headers: { "Content-Type": "multipart/form-data" 
          },
        });
        updatedFormData.imageUrl = uploadRes.data.imageUrl;
      }

      // if (linkFile) {
      //   const fileData = new FormData();
      //   fileData.append("file", linkFile);
        
      //   const linkUploadRes = await axios.post("/api/upload-file", fileData, {
      //     headers: { "Content-Type": "multipart/form-data"

      //      }
      //   });
      //   updatedFormData.link = linkUploadRes.data.linkUrl;
      // }

      if (isEditMode) {
        await axios.put(`/api/investor-relations/${id}`, updatedFormData);
      } else {
        await axios.post("/api/investor-relations", updatedFormData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/admin/our-firm/investor-relations");

    } catch (err) {
      console.error("Save error:", err);
      setError("Error saving data.");
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
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            className="w-full border p-2 rounded"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <textarea
            name="content"
            rows={4}
            className="w-full border p-2 rounded"
            value={formData.content}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Image Upload</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            className="w-full border p-2 rounded"
          />
          {(formData.imageUrl && !imageFile) && (
            <div className="mt-2">
              <img
                src={formData.imageUrl}
                alt="Current"
                className="w-32 h-32 object-cover border"
              />
            </div>
          )}
          {imageFile && (
            <div className="mt-2">
              <img
                src={URL.createObjectURL(imageFile)}
                alt="New"
                className="w-32 h-32 object-cover border"
              />
            </div>
          )}
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
          {(formData.link && !linkFile) && (
            <div className="mt-2">
              <a
                href={formData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600"
              >
                Open Existing File
              </a>
            </div>
          )}
          {linkFile && (
            <div className="mt-2">
              <p className="text-gray-600">
                Chosen file: {linkFile.name}
              </p>
            </div>
          )}
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
