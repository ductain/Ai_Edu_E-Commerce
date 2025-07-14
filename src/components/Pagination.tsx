import React from "react";
import { Pagination as AntdPagination } from "antd";

interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ current, total, pageSize, onChange }) => {
  return (
    <div className="flex justify-center items-center py-6 w-full">
      <AntdPagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
        className="!flex !flex-wrap !gap-2 !justify-center !w-full md:!w-auto"
        responsive
      />
    </div>
  );
};

export default Pagination; 