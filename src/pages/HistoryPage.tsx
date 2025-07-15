import { useEffect, useState } from "react";
import {
  getHistoryProducts,
  updateProductFavorite,
  updateProductHistory,
} from "../services/api";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import { Row, Col, Empty, message, notification } from "antd";
import ProductDetailModal from "../components/ProductDetailModal";

const HistoryPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    setLoading(true);
    getHistoryProducts()
      .then((data) => setProducts(data))
      .finally(() => setLoading(false));
  }, []);

  const paginatedProducts = products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleDetail = async (product: Product) => {
    try {
      await updateProductHistory(product.id, true);
    } catch (error) {
      console.log(error);
    }
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  const handleToggleFavorite = async (product: Product) => {
    try {
      const updated = await updateProductFavorite(
        product.id,
        !product.isFavorite
      );
      if (updated.isFavorite) {
        notification.success({
          message: "Thông báo",
          description: `${product.name} đã được thêm vào yêu thích!`,
        });
      } else {
        notification.info({
          message: "Thông báo",
          description: `${product.name} đã được bỏ khỏi yêu thích.`,
        });
      }
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, isFavorite: updated.isFavorite } : p
        )
      );
      setSelectedProduct((prev) =>
        prev && prev.id === product.id
          ? { ...prev, isFavorite: updated.isFavorite }
          : prev
      );
    } catch (e) {
      message.error("Có lỗi khi cập nhật yêu thích.");
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Lịch sử đã xem</h2>
      {loading ? (
        <Row gutter={[24, 32]}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <Col
              key={idx}
              xs={24}
              sm={12}
              md={8}
              lg={6}
              className="flex justify-center"
            >
              <ProductCard loading />
            </Col>
          ))}
        </Row>
      ) : products.length === 0 ? (
        <div className="flex justify-center">
          <Empty description="Chưa có sản phẩm nào đã xem" />
        </div>
      ) : (
        <>
          <Row gutter={[24, 32]}>
            {paginatedProducts.map((product) => (
              <Col
                key={product.id}
                xs={24}
                sm={12}
                md={8}
                lg={6}
                className="flex justify-center"
              >
                <ProductCard product={product} onDetail={handleDetail} onToggleFavorite={handleToggleFavorite}/>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            total={products.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
          />
        </>
      )}
      <ProductDetailModal
        open={modalOpen}
        product={selectedProduct}
        onClose={handleCloseModal}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
};

export default HistoryPage;
