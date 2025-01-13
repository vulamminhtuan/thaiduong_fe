import React from "react";
import BannerImage from "../../../assets/images/banner.png";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useTranslation } from "react-i18next";


function Home() {
  const { t } = useTranslation();

  return (
    <>
      <div
        className="relative bg-cover bg-center"
        style={{
          backgroundImage: `url(${BannerImage})`,
          height: "calc(100vh - 105px)",
        }}
      >
        <div className="absolute inset-0 bg-[#1f2937] bg-opacity-75 text-white">
          <div className="container mx-auto px-6 mt-24">
            <h2 className="text-4xl font-bold">THAI DUONG CAPITAL</h2>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              {t('introduction')}
            </p>
            <Link
              to={"/about"}
              className="px-4 py-3 mt-10 bg-[#f99d20] hover:bg-[#f98220] rounded-lg inline-flex gap-2 font-bold"
            >
              {t('button learn more')} <MoveRight />
            </Link>
          </div>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {t('about home')}
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              {t('about home content')}
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {t('experience')}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {t('experience content')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {t('expertise')}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {t('expertise content')}
                    </p>
                  </div>
                </div>
              </div>
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">
                      {t('trust')}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {t('trust content')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {t("mi 20")}
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            {t("mi 21")}
            </p>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                  {t("product 1")}
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                  {t("mi 23")}
                  </p>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                  {t("mi 26")}
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                  {t("mi 24")}
                  </p>
                </div>
              </div>
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                  <h3 className="text-lg font-medium text-gray-900">
                  {t("mi 22")}
                  </h3>
                  <p className="mt-4 text-base text-gray-500">
                  {t("mi 25")}

                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;