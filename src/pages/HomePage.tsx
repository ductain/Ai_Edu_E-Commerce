import { useEffect, useState } from "react";
import {
  getProducts,
  getSuggestions,
  updateProductFavorite,
  updateProductHistory,
} from "../services/api";
import type { Product } from "../types/Product";
import ProductCard from "../components/ProductCard";
import ProductDetailModal from "../components/ProductDetailModal";
import { Row, Col, message, Alert, Empty } from "antd";
import Pagination from "../components/Pagination";
import FilterBar from "../components/FilterBar";
import Banner from "../components/Banner";

const Homepage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
        setError(null);
      })
      .catch(() => {
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSearch = (value: string) => {
    const lower = value.toLowerCase();
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(lower)
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleFilterPrice = (range: string) => {
    let filtered = [...products];
    if (range === "low") {
      filtered = filtered.filter((p) => p.price < 500000);
    } else if (range === "medium") {
      filtered = filtered.filter(
        (p) => p.price >= 500000 && p.price <= 1000000
      );
    } else if (range === "high") {
      filtered = filtered.filter((p) => p.price > 1000000);
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSuggest = async () => {
    try {
      setLoading(true);
      const suggestions = await getSuggestions("1");
      setFilteredProducts(suggestions);
      setCurrentPage(1);
    } catch (err) {
      message.error("Không thể lấy gợi ý lúc này.");
    } finally {
      setLoading(false);
    }
  };

  const handleDetail = async (product: Product) => {
    try {
      await updateProductHistory(product.id, true);
    } catch {}
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
        message.success("Đã thêm vào yêu thích!");
      } else {
        message.info("Đã bỏ khỏi yêu thích.");
      }
      setProducts((prev) =>
        prev.map((p) =>
          p.id === product.id ? { ...p, isFavorite: updated.isFavorite } : p
        )
      );
      setFilteredProducts((prev) =>
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
      <Banner />
      <div id="product-list">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Danh sách sản phẩm
        </h2>
        <FilterBar
          onSearch={handleSearch}
          onFilterPrice={handleFilterPrice}
          onSuggest={handleSuggest}
        />

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
        ) : error ? (
          <div className="flex justify-center">
            <Alert message={error} type="error" showIcon />
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex justify-center">
            <Empty description="Không có sản phẩm" />
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
                  <ProductCard
                    product={product}
                    onDetail={handleDetail}
                    onToggleFavorite={handleToggleFavorite}
                  />
                </Col>
              ))}
            </Row>
            <Pagination
              current={currentPage}
              total={filteredProducts.length}
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
    </div>
  );
};

export default Homepage;
