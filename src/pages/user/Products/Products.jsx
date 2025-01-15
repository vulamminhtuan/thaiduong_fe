import React, { useState, useEffect } from 'react';
import Breadcrumb from '../Breadcrumb';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Products() {
  const [indexProduct, setIndexProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t,i18n } = useTranslation();

  const productEndpoints = [
    {
      title: 'Fund Management',
      endpoint: '/api/fund-management',
    },
    {
      title: 'Investment Managed Account',
      endpoint: '/api/investment-managed',
    },
    {
      title: 'Investment & Strategy Advisory',
      endpoint: '/api/investment-strategy',
    },
    {
      title: 'Incidental Investment Services',
      endpoint: '/api/incidental-investment',
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Bắt đầu quá trình tải dữ liệu
      try {
        const fetchPromises = productEndpoints.map(product =>
          fetch(`https://thaiduong-be.onrender.com${product.endpoint}`).then(res => {
            if (!res.ok) {
              throw new Error(`Failed to fetch ${product.title}`);
            }
            return res.json();
          }),
        );
  
        const results = await Promise.all(fetchPromises);
  
        // Kết hợp dữ liệu từ productEndpoints và kết quả từ API
        const aggregatedProducts = productEndpoints.map((product, index) => {
          const data = results[index] || [];
          const contentMap = data.length > 0 ? data[0].content : {};
          const imageURL = data.length > 0 ? data[0].imageURL : '';
        
          return { ...product, description: contentMap, imageURL };
        });
        
  
        setProducts(aggregatedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Kết thúc quá trình tải dữ liệu
      }
    };
  
    fetchData();
  }, []);
  

  const getLinkClass = index => {
    return indexProduct === index
      ? 'bg-[#f99d20] text-white'
      : 'hover:bg-[#f99d20] hover:text-white';
  };

  const getLocalizedContent = (contentMap) => {
    const text = contentMap?.[i18n.language] || contentMap?.en || 'No data available.';
    return typeof text === 'string'
      ? text.split('\n').filter(para => para.trim() !== '')
      : ['No data available.'];
  };

  const breadcrumbItems = [
    { label: t('list menu.3') , href: '/products' },
    ...(indexProduct !== null ? [{ label: t(`product ${indexProduct + 1}`) }] : []),
  ];

  if (loading) {
    return (
      <div className='container mx-auto px-6 py-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>
        {t('product')}
        </h1>
        <div className='ml-4 mb-4'>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className='text-center'>Loading...</div>
      </div>
    );
  }
//xong rôid 
  if (error) {
    return (
      <div className='container mx-auto px-6 py-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>
        {t('product')}
        </h1>
        <div className='ml-4 mb-4'>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div className='text-center text-red-500'>
          Lỗi khi tải dữ liệu: {error}. Vui lòng thử lại sau.
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className='container mx-auto px-6 py-8'>
        <h1 className='text-4xl font-bold text-gray-900 mb-8'>
        {t('product')}
        </h1>
        <div className='ml-4 mb-4'>
          <Breadcrumb items={breadcrumbItems} />
        </div>
        <div>No products available.</div>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-6 py-8'>
      <h1 className='text-4xl font-bold text-gray-900 mb-8'>
      {t('product')}
      </h1>

      <div className='ml-4 mb-4'>
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className='grid grid-cols-12 gap-4'>
        <div className='col-span-3 bg-slate-50 p-4 rounded-lg'>
          <ul className='flex flex-col gap-2'>
            {products.map((product, index) => (
              <li
                key={index}
                className={`p-2 rounded-lg cursor-pointer transition duration-300 font-bold ${getLinkClass(
                  index,
                )}`}
                onClick={() => setIndexProduct(index)}
              >
                 {t(`product ${index + 1}`)} {/* Chỉ hiển thị tiêu đề từ productEndpoints */}
              </li>
            ))}
          </ul>
        </div>

        <div className='col-span-9'>
          {indexProduct === null ? (
            <div className='text-gray-700 text-center py-4 text-lg font-semibold'>
              {t('notification')}
            </div>
          ) : (
            <>
              <h2 className='text-2xl font-bold'>
              {t(`product ${indexProduct + 1}`)} {/* Hiển thị tiêu đề từ API */}
              </h2>

              <br />
              <div className='grid grid-cols-12 gap-4'>
                <div className='col-span-4'>
                  {products[indexProduct].imageURL ? (
                    <img
                      src={products[indexProduct].imageURL.startsWith('http')
                        ? products[indexProduct].imageURL
                        :  `https://thaiduong-be.onrender.com/api/images/${products[indexProduct].imageURL}`} 
                      alt={t(`product ${indexProduct + 1}`)}
                      className="mt-2 w-full h-40 object-cover rounded"
                    />
                  ) : (
                    <div className='text-gray-500'>No image available.</div>
                  )}
                </div>

                <div className='col-span-8 flex flex-col gap-4'>
                {getLocalizedContent(products[indexProduct].description).map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
