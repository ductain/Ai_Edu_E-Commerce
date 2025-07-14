import { Input } from "antd";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <Input.Search
      placeholder="Tìm kiếm sản phẩm..."
      allowClear
      enterButton
      className="edushop-searchbar"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onSearch={onSearch}
    />
  );
};

export default SearchBar;
