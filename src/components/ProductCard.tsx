import { Card, Button, Rate, Skeleton } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import type { Product } from "../types/Product";
import { useMemo } from "react";

interface ProductCardProps {
  product?: Product;
  onDetail?: (product: Product) => void;
  loading?: boolean;
  onToggleFavorite?: (product: Product) => void;
}

function getViewedText(clickedTime?: string | Date) {
  if (!clickedTime) return null;
  const now = new Date();
  const clickedDate = new Date(clickedTime);
  const isToday =
    now.getFullYear() === clickedDate.getFullYear() &&
    now.getMonth() === clickedDate.getMonth() &&
    now.getDate() === clickedDate.getDate();
  if (isToday) return "Đã xem hôm nay";
  // Calculate days difference
  const diffTime = now.getTime() - clickedDate.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 1) return "Đã xem 1 ngày trước";
  if (diffDays > 1) return `Đã xem ${diffDays} ngày trước`;
  return null;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onDetail, loading, onToggleFavorite }) => {
  if (loading) {
    return (
      <Card className="w-full max-w-sm mx-auto flex flex-col" hoverable>
        <Skeleton.Image style={{ width: 240, height: 192, marginBottom: 16 }} active />
        <Skeleton active />
      </Card>
    );
  }

  if (!product) return null;

  const viewedText = useMemo(() => getViewedText(product.clickedTime), [product.clickedTime]);

  return (
    <Card
      hoverable
      className="w-full max-w-xl min-h-116 mx-auto flex flex-col"
      cover={
        <img
          alt={product.name}
          src={product.image}
          className="h-48 w-full object-cover rounded-t"
        />
      }
    >
      {(onToggleFavorite || viewedText) && (
        <div className="flex flex-row items-center justify-between mb-1">
          {viewedText ? (
            <span className="text-xs text-gray-500 italic truncate max-w-[70%]">{viewedText}</span>
          ) : <span />}
          {onToggleFavorite && (
            <Button
              type="text"
              className="bg-white/80 hover:bg-white/100 rounded-full shadow ml-2"
              icon={product.isFavorite ? <HeartFilled className="!text-red-500 text-xl" /> : <HeartOutlined className="text-gray-400 text-xl" />}
              onClick={e => {
                e.stopPropagation();
                onToggleFavorite(product);
              }}
              aria-label="Yêu thích"
            />
          )}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-base md:text-lg line-clamp-1">{product.name}</h3>
        <div className="text-gray-500 text-sm line-clamp-2">{product.shortDesc}</div>
        <div className="font-bold text-lg">{product.price.toLocaleString()}₫</div>
        <div className="flex items-center gap-1">
          <Rate disabled defaultValue={product.rating} allowHalf className="text-xs" />
          <span className="text-xs text-gray-400">({product.rating})</span>
        </div>
        <Button
          type="primary"
          className="mt-2 !bg-orange-600 hover:!bg-orange-700 !transition-all"
          onClick={() => onDetail && product && onDetail(product)}
          block
        >
          Xem chi tiết
        </Button>
      </div>
    </Card>
  );
};

export default ProductCard;
