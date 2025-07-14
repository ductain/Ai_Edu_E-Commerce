import { Select } from "antd";
const { Option } = Select;

interface PriceFilterProps {
  onFilterPrice: (value: string) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ onFilterPrice }) => {
  return (
    <Select
      className="w-35"
      defaultValue="all"
      onChange={onFilterPrice}
    >
      <Option value="all">Tất cả giá</Option>
      <Option value="low">Dưới 500K</Option>
      <Option value="medium">500K - 1 triệu</Option>
      <Option value="high">Trên 1 triệu</Option>
    </Select>
  );
};

export default PriceFilter;