import { Modal, Button, Rate } from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import type { Product } from "../types/Product";

interface ProductDetailModalProps {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onToggleFavorite: (product: Product) => void;
}

const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ open, product, onClose, onToggleFavorite }) => {
  if (!product) return null;

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
    >
      <div className="flex flex-col md:flex-row mt-6">
        <div className="md:w-1/2 w-full flex items-center justify-center bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="rounded-lg object-cover w-full h-64 md:h-80"
          />
        </div>
        <div className="md:w-1/2 w-full p-6 flex flex-col gap-3">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-bold mb-1 flex-1 line-clamp-2">{product.name}</h2>
            <Button
              type="text"
              icon={product.isFavorite ? <HeartFilled className="!text-red-500 text-2xl" /> : <HeartOutlined className="text-gray-400 text-2xl" />}
              onClick={() => onToggleFavorite(product)}
              className="ml-2"
              aria-label="Yêu thích"
            />
          </div>
          <div className="font-bold text-lg">{product.price.toLocaleString()}₫</div>
          <div className="flex items-center gap-2">
            <Rate disabled defaultValue={product.rating} allowHalf />
            <span className="text-xs text-gray-500">({product.rating})</span>
          </div>
          <div className="text-sm text-gray-500 mb-2">Danh mục: <span className="font-medium text-gray-700">{product.category}</span></div>
          <div className="text-base text-gray-700 whitespace-pre-line mb-2">{product.longDesc}</div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
