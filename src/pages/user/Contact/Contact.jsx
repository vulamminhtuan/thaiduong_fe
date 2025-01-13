import React, { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cellPhone: '',
    homePhone: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;
    const phoneHomeRegex = /^[0-9]{7,15}$/;

    if (!formData.name || formData.name.trim().length < 2) {
      newErrors.name = 'Tên phải có ít nhất 2 ký tự.';
    }
    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Địa chỉ email không hợp lệ.';
    }
    if (!formData.message || formData.message.trim().length < 10) {
      newErrors.message = 'Tin nhắn phải có ít nhất 10 ký tự.';
    }
    if (!phoneRegex.test(formData.cellPhone)) {
      newErrors.cellPhone = 'Số di động không hợp lệ.';
    }
    if (!phoneHomeRegex.test(formData.homePhone)) {
      newErrors.homePhone = 'Số di động không hợp lệ.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post('https://thaiduong-be.onrender.com/api/contact', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        setSuccessMessage(t('mi 27'));
        setFormData({
          name: '',
          email: '',
          cellPhone: '',
          homePhone: '',
          message: '',
        });
      }
    } catch (err) {
      setErrors({ general: 'Đã xảy ra lỗi khi gửi tin nhắn.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='container mx-auto px-6 py-8'>
      <h1 className='text-4xl font-bold text-gray-900 mb-8'>
        {t('list menu.6')}
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div>
          <p className='text-gray-600 mb-8'>{t('contact us content')}</p>

          {/* Thông báo Success */}
          {successMessage && (
            <div className='mb-4 p-4 text-green-700 bg-green-100 rounded'>
              {successMessage}
            </div>
          )}

          {/* Thông báo Lỗi tổng quát */}
          {errors.general && (
            <div className='mb-4 p-4 text-red-700 bg-red-100 rounded'>
              {errors.general}
            </div>
          )}

          <form className='space-y-4' onSubmit={handleSubmit}>
            {/* Name */}
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                {t('full name')} <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='name'
                value={formData.name}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-1 border rounded-md shadow-sm ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                
              />
              {errors.name && (
                <p className='text-red-500 text-sm mt-1'>{errors.name}</p>
              )}
            </div>

            {/* Cell phone */}
            <div>
              <label
                htmlFor='cellPhone'
                className='block text-sm font-medium text-gray-700'
              >
                {t('cell phone')} <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='cellPhone'
                value={formData.cellPhone}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-1 border rounded-md shadow-sm ${
                  errors.cellPhone ? 'border-red-500' : 'border-gray-300'
                }`}
                
              />
              {errors.cellPhone && (
                <p className='text-red-500 text-sm mt-1'>{errors.cellPhone}</p>
              )}
            </div>

            {/* Home phone */}
            <div>
              <label
                htmlFor='homePhone'
                className='block text-sm font-medium text-gray-700'
              >
                {t('home phone')} <span className='text-red-500'>*</span>
              </label>
              <input
                type='text'
                id='homePhone'
                value={formData.homePhone}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-1 border rounded-md shadow-sm ${
                  errors.homePhone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.homePhone && (
                <p className='text-red-500 text-sm mt-1'>{errors.homePhone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email <span className='text-red-500'>*</span>
              </label>
              <input
                type='email'
                id='email'
                value={formData.email}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-1 border rounded-md shadow-sm ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-gray-700'
              >
                {t('message')} <span className='text-red-500'>*</span>
              </label>
              <textarea
                id='message'
                rows='4'
                value={formData.message}
                onChange={handleChange}
                className={`block w-full px-4 py-2 mt-1 border rounded-md shadow-sm ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.message && (
                <p className='text-red-500 text-sm mt-1'>{errors.message}</p>
              )}
            </div>

            {/* Button Submit */}
            <div className='flex justify-between'>
              <button
                type='submit'
                className={`px-6 py-2 text-white bg-blue-600 rounded-md ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
                disabled={isSubmitting}
              >
                {isSubmitting ? t('sending') + '...' : t('send')}
              </button>
            </div>
          </form>
        </div>

        {/* Thông tin công ty */}
        <div>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4'>
            {t('office location')}
          </h2>
          <p className='text-gray-600 mb-4'>
            Thai Duong Capital
            <br />
            {t('address')}
          </p>
          <h2 className='text-2xl font-semibold text-gray-900 mb-4 mt-8'>
            {t('contact information')}
          </h2>
          <p className='text-gray-600'>
            {t('phone')}: +84-28-54160779
            <br />
            Fax: +84-28-54160780
            <br />
            Email: info@thaiduongcapital.com.vn
          </p>
        </div>
      </div>
    </div>
  );
}
export default Contact;
