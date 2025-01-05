import React, { useState, useEffect } from "react";
import axios from "axios";
import Breadcrumb from "../Breadcrumb.js";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function About() {
  const [indexAbout, setIndexAbout] = useState(null); 
  const [overviews, setOverviews] = useState([]);
  const [businessPrinciples, setBusinessPrinciples] = useState([]);
  const [persons, setPersons] = useState([]);
  const [investorRelations, setInvestorRelations] = useState([]);
  const {t} = useTranslation();  

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);           
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewsRes, businessPrinciplesRes, personsRes, investorRelationsRes] = await Promise.all([
          axios.get("/api/overviews"),
          axios.get("/api/business-principles"),
          axios.get("/api/persons"),
          axios.get(`/api/investor-relations?page=${page}&size=4`),
        ]);

        setOverviews(overviewsRes.data.content);
        setBusinessPrinciples(businessPrinciplesRes.data.content);
        setPersons(personsRes.data.content);
        
        setInvestorRelations(investorRelationsRes.data.content);
        setTotalPages(investorRelationsRes.data.totalPages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  const arrTags = [
    { title: t('list our firm.1'), content: overviews },
    { title: t('list our firm.2'), content: businessPrinciples },
    { title: t('list our firm.3'), content: persons },
    { title: t('list our firm.4'), content: investorRelations },
  ];

  const breadcrumbItems = [
    { label: t("list menu.2"), href: "/about" },
    ...(indexAbout !== null ? [{ label: arrTags[indexAbout].title }] : []),
  ];

  const getLinkClass = (index) => {
    return indexAbout === index
      ? "bg-[#f99d20] text-white"
      : "hover:bg-[#f99d20] hover:text-white";
  };

  

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">{t("list menu.2")}</h1>

      <div className="ml-4 mb-4">
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
              {indexAbout === 0 &&
                arrTags[indexAbout].content.map((ct, i) => (
                  <p key={i} className="p-2">
                    {ct.content}
                  </p>
                ))}

              {indexAbout === 1 &&
                arrTags[indexAbout].content.map((ct, i) => (
                  <div key={i} className="mb-4">
                    {ct.title && (
                      <h4 className="font-bold text-xl">{ct.title}</h4>
                    )}
                    {ct.description && (
                      <p className="p-2 text-gray-700">{ct.description}</p>
                    )}
                  </div>
                ))}

              {indexAbout === 2 && (
                <div className="grid grid-cols-2 gap-4">
                  {arrTags[indexAbout].content.map((ct, i) => (
                    <div key={i} className="bg-slate-100 p-4 rounded-lg">
                      <h4 className="font-bold text-lg">{ct.username}</h4>
                      <p className="p-2 text-gray-700">{ct.position}</p>
                    </div>
                  ))}
                </div>
              )}

              {indexAbout === 3 && (
                <div className="grid gap-4">
                {arrTags[indexAbout].content.map((ct, i) => (
                  <div
                    key={i}
                    className="bg-slate-100 p-4 rounded-lg flex flex-col"
                  >
                    <h4 className="font-bold text-lg">
                    {new Date(ct.date).toLocaleDateString("vi-VN")}: {ct.title}
                    </h4>
                    <div className="flex justify-between mt-4">
                      <div className="flex">
                        <img
                          src={
                            ct.imageUrl.startsWith("http")
                              ? ct.imageUrl
                              : `http://localhost:8080/api/images/${ct.imageUrl}`
                          }
                          alt={ct.title}
                          className="w-24 h-24 object-cover mr-4 rounded-md"
                        />
                        <p className="p-2 text-gray-700">{ct.content}</p>
                      </div>
                      <div className="flex items-end">
                        <Link
                          to={`/investor-relations/${ct.id}`}
                          className="text-red-500 font-bold hover:text-[#f99d20] hover:underline"
                        >
                          Read more...
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center items-center gap-2 mt-4">
                  <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 0}
                    className={`px-3 py-1 rounded ${
                      page === 0 ? "bg-gray-300" : "bg-[#f99d20] text-white"
                    }`}
                  >
                    Prev
                  </button>

                  <span>{`Page ${page + 1} / ${totalPages}`}</span>

                  <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page + 1 >= totalPages}
                    className={`px-3 py-1 rounded ${
                      page + 1 >= totalPages ? "bg-gray-300" : "bg-[#f99d20] text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default About;
