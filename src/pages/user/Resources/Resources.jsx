import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Breadcrumb from "../Breadcrumb";
import axios from "axios";
import { useTranslation } from "react-i18next";

const Resources = () => {
  const location = useLocation();

  const [indexAbout, setIndexAbout] = useState(null); 
  const [searchTerm, setSearchTerm] = useState("");

  const [news, setNews] = useState([]); 
  const [filteredNews, setFilteredNews] = useState([]);

    const [page, setPage] = useState(0);  
    const [totalPages, setTotalPages] = useState(1);          
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const { t, i18n } = useTranslation();

  const arrTags = [
    { title: t('list our resources.1'), content: [] },
    { title: t('list our resources.2'), content: [] },
    { title: t('list our resources.3'), content: [] },
  ];

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tabValue = query.get("tab");
    const searchValue = query.get("search") || "";

    if (tabValue !== null) {
      setIndexAbout(Number(tabValue)); 
    }
    setSearchTerm(searchValue);
  }, [location]);

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    if (indexAbout === 1) {
      const fetchNews = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://thaiduong-be.onrender.com/api/news?page=${page}&size=6`);
          setNews(response.data.news || []);
          setTotalPages(response.data.totalPages || 1);
        } catch (err) {
          console.error("Lỗi khi tải tin tức:", err);
          setError("Không thể tải tin tức");
        } finally {
          setLoading(false); // Đảm bảo loading luôn được tắt
        }
      };
      fetchNews();
    }
  }, [indexAbout,page]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredNews(news);
    } else {
      const lowerKeyword = searchTerm.toLowerCase();
      const filtered = news.filter((article) => {
        // Lấy ra chuỗi title phù hợp ngôn ngữ
        const localizedTitle = getLocalizedContent(article.title) || '';
        return localizedTitle.toLowerCase().includes(lowerKeyword);
      });
      setFilteredNews(filtered);
    
    }
  }, [indexAbout, news, searchTerm]);

  const getLinkClass = (index) =>
    indexAbout === index
      ? "bg-[#f99d20] text-white"
      : "hover:bg-[#f99d20] hover:text-white";

  const breadcrumbItems = [
    { label: t("list menu.4"), href: "/resources" },
    ...(indexAbout !== null ? [{ label: arrTags[indexAbout].title }] : []),
  ];

  // Component Loading Spinner
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-48">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#f99d20]"></div>
    </div>
  );
  const getLocalizedContent = (content) => content?.[i18n.language] || content?.en; // Fallback to English if language missing

  // Hiển thị trạng thái Loading
  if (loading) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{t("list menu.4")}</h1>
        <div className="ml-4 mb-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <LoadingSpinner />
      </div>
    );
  }

  // Hiển thị lỗi
  if (error) {
    return (
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{t("list menu.4")}</h1>
        <div className="ml-4 mb-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className="text-center text-red-500">
          {error}. Vui lòng thử lại sau.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{t("list menu.4")}</h1>
      <div className="mb-4">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 bg-slate-50 p-4 rounded-lg">
          <ul className="flex flex-col gap-2">
            {arrTags.map((tag, index) => (
              <li
                key={index}
                className={`p-2 rounded-lg cursor-pointer transition duration-300 font-bold ${getLinkClass(
                  index
                )}`}
                onClick={() => setIndexAbout(index)}
              >
                {tag.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-9">
          {indexAbout === null ? (
            <div className="text-gray-700 text-center py-4 text-lg font-semibold">
                {t('notification')}
            </div>
          ) : (
            <>
            <h2 className="text-2xl font-bold">{arrTags[indexAbout].title}</h2>
              <br />
              {indexAbout === 1 ? (
                filteredNews.length > 0 ? (
                  <>
                    {/* Danh sách tin */}
                    <div className="grid grid-cols-3 gap-4 overflow-x-auto">
                      {filteredNews.map((article) => (
                        <div
                          key={article.id}
                          className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer min-w-[300px]"
                          onClick={() => setSelectedArticle(article)}
                        >
                          <img
                            src={
                              article.imageUrl.startsWith("http")
                              ? article.imageUrl
                              : `https://thaiduong-be.onrender.com/api/images/${article.imageUrl}`
                          }
                            alt={article.title}
                            className="w-full h-48 object-cover rounded-t-lg mb-4"
                          />
                          <h3 className="font-semibold text-lg mb-2 text-gray-900">
                            {getLocalizedContent(article.title, 80)}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {article.createdAt
                              ? new Date(article.createdAt).toLocaleDateString("vi-VN", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })
                              : "Không có ngày"}
                          </p>
                        </div>
                      ))}
                    </div>

                    
                    <div className="flex justify-center items-center gap-2 mt-4">
                      <button
                        onClick={() => setPage((prev) => prev - 1)}
                        disabled={page === 0}
                        className={`px-3 py-1 rounded ${
                          page === 0
                            ? "bg-gray-300"
                            : "bg-[#f99d20] text-white"
                        }`}
                      >
                        {t("mi 19")}
                      </button>

                      <span>{` ${page + 1} / ${totalPages}`}</span>

                      <button
                        onClick={() => setPage((prev) => prev + 1)}
                        disabled={page + 1 >= totalPages}
                        className={`px-3 py-1 rounded ${
                          page + 1 >= totalPages
                            ? "bg-gray-300"
                            : "bg-[#f99d20] text-white"
                        }`}
                      >
                        {t("mi 18")}
                      </button>
                    </div>
                  </>
                ) : (
                  <p>Không tìm thấy kết quả phù hợp.</p>
                )
              ) : (
                <p>Chưa có nội dung.</p>
              )}
            </>
          )}
        </div>
      </div>
      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg max-w-lg w-full shadow-lg">
            <div className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
              <h5 className="text-lg font-semibold text-gray-800">{getLocalizedContent(selectedArticle.title)}</h5>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
                aria-label="Close"
                onClick={() => setSelectedArticle(null)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="px-6 py-4">
              <img
              src={
                selectedArticle.imageUrl.startsWith("http")
                              ? selectedArticle.imageUrl
                              : `${process.env.BACKEND_URL}/api/images/${selectedArticle.imageUrl}`
                          }
                alt={selectedArticle.title}
                className="w-full h-auto rounded-md mb-4"
              />
              <p className="text-gray-700 mb-4">{getLocalizedContent(selectedArticle.content)}</p>
              <p className="text-sm text-gray-500">
                Ngày:{" "}
                {selectedArticle.createdAt
                  ? new Date(selectedArticle.createdAt).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Không có ngày"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Resources;
