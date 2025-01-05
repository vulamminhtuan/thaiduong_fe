import React, { useState } from "react";
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';


function SearchBar({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
    const {t} = useTranslation(); 

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (!searchValue.trim()) {
      alert(t('search text'));
      return;
    }
    onSearch(searchValue.trim());
  };
  return (
    <form onSubmit={handleSubmit}  className="relative">
      <input
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={t('search')}
        className="w-48 pl-10 pr-4 py-1 text-sm rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <Search type="submit" className="absolute left-3 top-1.5 h-4 w-4 text-gray-400" />
    </form>
  );
};

export default SearchBar;