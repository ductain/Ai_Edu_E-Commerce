# EduShop

EduShop là sàn thương mại điện tử giáo dục hiện đại, nơi người dùng có thể tìm kiếm, khám phá, yêu thích và nhận gợi ý thông minh cho các khoá học, tài liệu giáo dục trực tuyến.

## 🚀 Tính năng nổi bật
- **Hiển thị danh sách sản phẩm/khoá học** với ảnh, giá, mô tả, đánh giá
- **Tìm kiếm, lọc giá** nhanh chóng
- **Gợi ý thông minh (AI)** dựa trên hành vi người dùng
- **Xem chi tiết sản phẩm** qua modal đẹp mắt
- **Yêu thích sản phẩm** và quản lý danh sách yêu thích
- **Lịch sử xem** sản phẩm đã click
- **Chatbot AI tư vấn sản phẩm** (giao diện nổi bật, luôn sẵn sàng hỗ trợ)
- **Responsive UI**: hoạt động tốt trên desktop, tablet, mobile
- **Hiệu ứng mượt mà, UX hiện đại**

## 🛠️ Công nghệ sử dụng
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Ant Design](https://ant.design/) (UI components)
- [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS)
- [Axios](https://axios-http.com/) (API calls)
- [Vite](https://vitejs.dev/) (build tool)
- [mockapi.io](https://mockapi.io/) (mock API)
- [Vercel](https://vercel.com/) (deploy)

## ⚡️ Demo
Dự án đã được deploy tại: [https://ai-edu-e-commerce.vercel.app/]

## 📦 Hướng dẫn cài đặt & chạy local
1. **Clone repo:**
   ```bash
   git clone https://github.com/ductain/Ai_Edu_E-Commerce.git
   cd edushop
   ```
2. **Cài đặt dependencies:**
   ```bash
   npm install
   # hoặc
   yarn install
   ```
3. **Chạy dev server:**
   ```bash
   npm run dev
   # hoặc
   yarn dev
   ```
   Truy cập [http://localhost:5173](http://localhost:5173) để xem ứng dụng.
4. **Build production:**
   ```bash
   npm run build
   # hoặc
   yarn build
   ```
   File build sẽ nằm trong thư mục `dist/`.

## 🛫 Deploy lên Vercel
- Chỉ cần connect repo với Vercel, chọn framework là **Vite** (React), mọi cấu hình đã sẵn sàng.
- Tham khảo: https://vercel.com/docs

## 📂 Cấu trúc thư mục chính
```
src/
  components/      # Các component UI (Banner, ProductCard, ChatbotModal...)
  pages/           # Các trang chính (Home, Favorite, History...)
  services/        # Gọi API
  types/           # Định nghĩa type TypeScript
  assets/          # Ảnh, icon, banner
  layout/          # Layout tổng thể
```

## 📞 Liên hệ & đóng góp
- Nếu có ý kiến, bug hoặc muốn đóng góp, hãy tạo issue hoặc PR trên Github repo này.

---
**EduShop** - Nền tảng giáo dục trực tuyến hiện đại, đồng hành cùng bạn trên hành trình tri thức!
