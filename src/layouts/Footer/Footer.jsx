import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Footer() {
  const { t } = useTranslation();

  const menuItems = [
    { name: t("list menu.1"), href: "/" },
    { name: t("list menu.2"), href: "/about" },
    { name: t("list menu.3"), href: "/products" },
    { name: t("list menu.4"), href: "/resources" },
    { name: t("list menu.5"), href: "/careers" },
    { name: t("list menu.6"), href: "/contact" },
  ];
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              _msttexthash="3070418"
              _msthash="103"
            >
              {t('Contact')}
            </h3>
            <p className="text-gray-400" _msttexthash="14972529" _msthash="104">
              Thai Duong Capital
              <br _istranslated="1" />
              {t('address')}
              <br _istranslated="1" />
              {t('phone')}: +84-28-54160779
              <br _istranslated="1" />
              Fax: +84-28-54160780
              <br _istranslated="1" />
              Email: info@thaiduongcapital.com.vn
            </p>
          </div>
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              _msttexthash="1431417"
              _msthash="105"
            >
              {t('Quick Links')}
            </h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className="text-gray-400 hover:text-white"
                  >
                    {item.name}

                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3
              className="text-lg font-semibold mb-4"
              _msttexthash="925444"
              _msthash="109"
            >
              {t('legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-gray-400 hover:text-white"
                  href="/privacy-policy"
                  _msttexthash="4048109"
                  _msthash="110"
                >
                  {t('privacy policy')}
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-white"
                  href="/terms-of-use"
                  _msttexthash="6278402"
                  _msthash="111"
                >
                  {t('terms of use')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            ©{" "}
            <font _mstmutation="1" _msttexthash="10545015" _msthash="112">
              2024 Thai Duong Capital
            </font>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
