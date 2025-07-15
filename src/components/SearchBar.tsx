import { Input } from "antd";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value)
  };

  return (
    <Input.Search
      placeholder="Tìm kiếm sản phẩm..."
      allowClear
      enterButton
      className="edushop-searchbar"
      value={searchValue}
      onChange={handleChange}
      onSearch={onSearch}
    />
  );
};

export default SearchBar;
