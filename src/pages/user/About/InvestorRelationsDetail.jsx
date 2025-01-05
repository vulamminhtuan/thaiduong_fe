import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import axios from "axios";
import Breadcrumb from "../Breadcrumb"; 

function InvestorRelationsDetail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const breadcrumbItems = [
    { label: "Our Firm", href: "/about" },
    { label: "Investor Relations", href: "/about" }, 
    ...(detailData ? [{ label: `${new Date(detailData.date).toLocaleDateString("vi-VN")}: ${detailData.title}` }] : [])
];

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/api/investor-relations/${id}`);
        setDetailData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) {
    return <div className="container mx-auto px-6 py-8">Loading...</div>;
  }

  if (error) {
    return <div className="container mx-auto px-6 py-8 text-red-500">Error: {error.message}</div>;
  }

  if (!detailData) {
    return <div className="container mx-auto px-6 py-8">No data found.</div>;
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <h1 className="text-3xl font-bold mb-4">
        {new Date(detailData.date).toLocaleDateString("vi-VN")}: {detailData.title}
      </h1>

     
      {detailData.link ? (
        <p className="text-blue-600 underline mb-4">
          <a
            href={`http://localhost:8080/api/files/${detailData.link
                          .split("\\")
                          .pop()}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click to open file
          </a>
        </p>
      ) : (
        <p className="text-gray-500 italic mb-4">
          No file link provided.
        </p>
      )}

      <div className="flex">
        <img
          src={
            detailData.imageUrl.startsWith("http")
          ? detailData.imageUrl
          : `http://localhost:8080/api/images/${detailData.imageUrl}`
          }
          alt={detailData.title}
          className="w-64 h-64 object-cover mr-6 rounded-md"
        />
        <p className="text-gray-700">{detailData.content}</p>
      </div>

      <div className="mt-8">
        <Link
          to="/about"
          className="text-[#f99d20] font-semibold underline"
        >
          &larr; Back to Investor Relations
        </Link>
      </div>
    </div>
  );
}

export default InvestorRelationsDetail;
