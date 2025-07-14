import { Button } from "antd";
import React from "react";
import bannerImg from "../assets/banner.png";

const Banner: React.FC = () => {
  //scroll to product list
  const handleStartClick = () => {
    const el = document.getElementById("product-list");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="w-full bg-gray-100 py-8 md:py-16 px-2 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Text Content */}
        <div className="flex-1 min-w-[260px] md:min-w-[340px] lg:min-w-[420px]">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
            Khám phá tri thức, <br className="hidden md:block" />
            <span className="text-orange-600">mở rộng tương lai</span>
          </h1>
          <ul className="mb-8 space-y-3">
            <li className="flex items-center gap-3 text-lg text-gray-700">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded-full" />
              Học mọi lúc, mọi nơi với khoá học đa dạng
            </li>
            <li className="flex items-center gap-3 text-lg text-gray-700">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded-full" />
              Giảng viên uy tín, nội dung cập nhật liên tục
            </li>
            <li className="flex items-center gap-3 text-lg text-gray-700">
              <span className="inline-block w-3 h-3 bg-orange-500 rounded-full" />
              Kết nối cộng đồng học tập năng động
            </li>
          </ul>
          <div className="flex md:justify-start justify-center">
            <Button
              type="primary"
              size="large"
              className="flex items-center !bg-orange-600 hover:!bg-orange-700 !transition-all !px-10"
              onClick={handleStartClick}
            >
              Bắt đầu ngay
            </Button>
          </div>
        </div>
        {/* Right: Image/Visual */}
        <div className="flex-1 flex items-center justify-center relative w-full min-h-[260px] md:min-h-[340px]">
          <img src={bannerImg} alt="Banner" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default Banner;
