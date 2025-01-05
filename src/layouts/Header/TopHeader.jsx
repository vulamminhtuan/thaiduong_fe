import React from 'react';
import { useNavigate } from 'react-router-dom';

import LanguageSelector from './LanguageSelector';
import SearchBar from './SearchBar';
import LoginButton from './LoginButton';

const TopHeader = () => {
  const navigate = useNavigate();

  const handleSearch = keyword => {
    navigate(`/resources?search=${encodeURIComponent(keyword)}&tab=1`);
  };

  return (
    <div className='bg-gray-100 border-b border-gray-200'>
      <div className='container mx-auto px-6'>
        <div className='flex justify-end items-center h-10 space-x-6'>
          <SearchBar onSearch={handleSearch} />
          <LanguageSelector />
          {/* <SearchBar /> */}
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
