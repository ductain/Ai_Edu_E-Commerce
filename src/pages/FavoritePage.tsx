import { useEffect, useState } from "react";
import { getFavoriteProducts, updateProductFavorite, updateProductHistory } from "../services/api";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import { Row, Col, message, Empty, notification } from "antd";
import ProductDetailModal from "../components/ProductDetailModal";
import Pagination from "../components/Pagination";

const FavoritePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;
  const paginatedProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    setLoading(true);
    getFavoriteProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

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
      const updated = await updateProductFavorite(product.id, !product.isFavorite);
      if (!updated.isFavorite) {
        notification.info({
          message: "Thông báo",
          description: `${product.name} đã được bỏ khỏi yêu thích.`,
        });
        setProducts((prev) => prev.filter((p) => p.id !== product.id));
        setSelectedProduct((prev) =>
          prev && prev.id === product.id ? null : prev
        );
        setModalOpen(false);
      } else {
        notification.success({
          message: "Thông báo",
          description: `${product.name} đã được thêm vào yêu thích!`,
        });
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, isFavorite: updated.isFavorite } : p
          )
        );
        setSelectedProduct((prev) =>
          prev && prev.id === product.id ? { ...prev, isFavorite: updated.isFavorite } : prev
        );
      }
    } catch (e) {
      message.error("Có lỗi khi cập nhật yêu thích.");
    }
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Sản phẩm yêu thích</h2>
      {loading ? (
        <Row gutter={[24, 32]}>
          {Array.from({ length: 8 }).map((_, idx) => (
            <Col key={idx} xs={24} sm={12} md={8} lg={6} className="flex justify-center">
              <ProductCard loading />
            </Col>
          ))}
        </Row>
      ) : products.length === 0 ? (
        <div className="flex justify-center">
          <Empty description="Chưa có sản phẩm yêu thích" />
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
                <ProductCard product={product} onDetail={handleDetail} onToggleFavorite={handleToggleFavorite} />
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

export default FavoritePage;