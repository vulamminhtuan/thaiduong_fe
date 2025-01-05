import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../components/AuthContext";
import { Briefcase, MapPin, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

function Careers() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const {t} = useTranslation();  
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("/api/jobs", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setJobs(response.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
        setError("An error occurred while fetching job data.");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleReadMore = (job) => {
      setSelectedJob(job);
    
  };
  const handleCloseModal = () => {
    setSelectedJob(null); 
  };

  const handleApplyNow = (jobId) => {
    setSelectedJob(null); 
    navigate(`/jobs/${jobId}/apply`); 
  };

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t("list menu.4")}</h1>
        <p className="text-lg text-gray-600 mb-8">
          Loading job data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t("list menu.4")}</h1>
        <p className="text-lg text-red-500 mb-8">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{t("list menu.4")}</h1>
      <p className="text-lg text-gray-600 mb-8">
        {t('resources content')}
      </p>
      <div className="grid grid-cols-1 gap-8">
        {jobs.length === 0 ? (
          <p className="text-gray-500">Hiện không có vị trí tuyển dụng nào.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="bg-gray-100 shadow-md rounded-lg p-6">
              <div className="flex justify-between items-start">
                <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {job.title}
                  {job.createdAt && (
                    <span className="ml-2 text-sm text-gray-500">
                    (
                    {format(new Date(job.createdAt), 'Pp', { locale: vi })}
                    )
                    </span>
                  )}
                </h2>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <svg className="w-5 h-5 mr-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7 7 7M5 19h14v-7H5v7z" />
                    </svg>
                    <span className="mx-2">•</span>
                    <svg className="w-5 h-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l1.5-1.5a1 1 0 011.415 0L12 14.585l6.085-6.085a1 1 0 011.415 0L21 10M5 19h14v-7H5v7z" />
                    </svg>
                    <span className="mx-2">•</span>
                    <span>{job.numberOfApplications} Applications</span>
                  </div>
                </div>
              </div>
              {job.description && (
                <p className="mt-4 text-gray-600">
                  {job.description.length > 100
                    ? job.description.substring(0, 100) + "..."
                    : job.description}
                </p>
              )}
              <div>
              <button
                  onClick={() => handleReadMore(job)}
                  className="mt-4 text-blue-500 hover:text-[#f99d20] cursor-pointer"
                >
                  Read more...
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white w-11/12 max-w-lg p-6 rounded-lg shadow-lg relative">
              <button
                onClick={handleCloseModal}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>

              {/* Tiêu đề công việc */}
              <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center border-b-2 pb-2">
                {selectedJob.title}
              </h2>

              {/* Thông tin cơ bản */}
              <div className="mt-4 flex flex-col items-start space-y-2">
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-purple-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7 7 7M5 19h14v-7H5v7z" />
                  </svg>
                  <span className="text-lg font-medium">{selectedJob.address}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <svg className="w-5 h-5 mr-2 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l1.5-1.5a1 1 0 011.415 0L12 14.585l6.085-6.085a1 1 0 011.415 0L21 10M5 19h14v-7H5v7z" />
                  </svg>
                  <span className="text-lg font-medium">{selectedJob.phone}</span>
                </div>
                <div className="text-gray-600">
                  <span className="text-lg font-medium">
                    {selectedJob.numberOfApplications} Applications
                  </span>
                </div>
              </div>

              {/* Mô tả công việc */}
              <p className="mt-6 text-gray-700 leading-relaxed">{selectedJob.description}</p>

              {/* Yêu cầu công việc */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Requirements:</h3>
                {selectedJob.requirements && selectedJob.requirements.length > 0 ? (
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {selectedJob.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No specific requirements listed.</p>
                )}
              </div>
              <div className="mt-6 text-right">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={() => handleApplyNow(selectedJob.id)}
                >
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Careers;
