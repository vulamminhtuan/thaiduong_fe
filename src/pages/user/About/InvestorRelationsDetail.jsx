import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom"; 
import axios from "axios";
import Breadcrumb from "../Breadcrumb"; 
import { useTranslation } from "react-i18next";


function InvestorRelationsDetail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();

  const getTitle = (item) => {
    return i18n.language === "vi" ? item.titleVi : item.titleEn;
  };
  
  const getContent = (item) => {
    return i18n.language === "vi" ? item.contentVi : item.contentEn;
  };
  const breadcrumbItems = [
    { label: "Our Firm", href: "/about" },
    { label: "Investor Relations", href: "/about" }, 
    ...(detailData ? [{ label: `${new Date(detailData.date).toLocaleDateString("vi-VN")}: ${getTitle(detailData)}` }] : [])
];

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`https://thaiduong-be.onrender.com/api/investor-relations/${id}`);
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
        {new Date(detailData.date).toLocaleDateString("vi-VN")}: {getTitle(detailData)}
      </h1>

     
      {detailData.link ? (
        <p className="text-blue-600 underline mb-4">
          <a
            href={`https://thaiduong-be.onrender.com/api/files/${detailData.link
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
          : `https://thaiduong-be.onrender.com/api/images/${detailData.imageUrl}`
          }
          alt={getTitle(detailData)}
          className="w-64 h-64 object-cover mr-6 rounded-md"
        />
        <p className="text-gray-700">{getContent(detailData)}</p>
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
