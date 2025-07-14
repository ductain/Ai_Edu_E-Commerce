import PriceFilter from "./PriceFilter";
import SuggestionButton from "./SuggestionButton";
import SearchBar from "./SearchBar";

interface FilterBarProps {
  onSearch: (value: string) => void;
  onFilterPrice: (value: string) => void;
  onSuggest: () => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ onSearch, onFilterPrice, onSuggest }) => {
  return (
    <div className="w-full flex flex-col md:flex-row justify-end mb-6 gap-4">
      <div className="flex sm:flex-row gap-4 items-center">
        <PriceFilter onFilterPrice={onFilterPrice} />
        <SuggestionButton onSuggest={onSuggest} />
      </div>
      <div className="flex w-[31rem] max-w-full">
      <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

export default FilterBar;
