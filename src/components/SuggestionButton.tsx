import { Button } from "antd";

interface SuggestionButtonProps {
  onSuggest: () => void;
}

const SuggestionButton: React.FC<SuggestionButtonProps> = ({ onSuggest }) => {
  return (
    <Button
      onClick={onSuggest}
      type="primary"
      className="flex items-center gap-2 !bg-orange-600 hover:!bg-orange-700 !transition-all"
    >
      Gợi ý sản phẩm
    </Button>
  );
};

export default SuggestionButton;