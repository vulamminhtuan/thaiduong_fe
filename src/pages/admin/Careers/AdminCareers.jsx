import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminCareers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://thaiduong-be.onrender.com/api/jobs");
      setJobs(response.data || []);
    } catch (err) {
      setError("Error loading jobs data.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this job?")) {
      try {
        await axios.delete(`https://thaiduong-be.onrender.com/api/jobs/${id}`);
        fetchJobs();
      } catch (err) {
        setError("Error deleting job.");
        console.error(err);
      }
    }
  };

  const handleAddNew = () => {
    navigate("/admin/jobs/add");
  };

  const formatEnglishText = (textMap) => {
    if (!textMap || !textMap.en) return "N/A"; // Kiểm tra nếu không có tiếng Anh
    return textMap.en; // Trả về nội dung tiếng Anh
  };
  


  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-normal">Manage Jobs</h1>
        <button
          onClick={handleAddNew}
          className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded flex items-center gap-1"
        >
          <span>+ Add Job</span>
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center">No jobs available.</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Id
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Title
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Description
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Requirement
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Address
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Phone
                </th>
                <th className="px-4 py-3 text-left font-medium text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{job.id}</td>
                  <td className="px-4 py-3">{formatEnglishText(job.title)}</td>
                  <td className="px-4 py-3">
                    {formatEnglishText(job.description).length > 50
                      ? `${formatEnglishText(job.description).substring(0, 50)}...`
                      : formatEnglishText(job.description)}
                  </td>
                  <td className="px-4 py-3">
                    {job.requirements && job.requirements.length > 0 ? (
                      job.requirements.join(", ") 
                    ) : (
                      "No requirements specified"
                    )}
                  </td>
                  <td className="px-4 py-3">{formatEnglishText(job.address)}</td>
                  <td className="px-4 py-3">{job.phone}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/admin/jobs/edit/${job.id}`)}
                        className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminCareers;
