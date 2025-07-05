import { SearchOutlined } from "@ant-design/icons";
import { Input, Table } from "antd";
import clsx from "clsx";
import { useMemo } from "react";
import { IBaseTableProps } from "./interfaces";

/**
 * Base Table
 * Component BaseTable ini digunakan sebagai reusable tabel pada seluruh project Gihon,
 * Component ini dapat diintergrasikan menjadi Async Table dengan kombinasi dengan useTableAsync hooks
 */
const BaseTable = <T = unknown,>({
  className,
  data,
  columns,
  onPageChange,
  pageSizeOptions = undefined,
  onSizeChange,
  withQuickPageJumper = false,
  onTableChange,
  isLoading = false,
  total = undefined,
  onSearchChange = () => {
    /* no-op */
  },
  withSearch = false,
  actionComponent,
  filterComponents,
  currentPage = undefined,
  pageSize = undefined,
  sort = "DESC",
  orderBy,
  onSortChange,
}: IBaseTableProps<T>) => {
  const enhancedColumns = useMemo(
    () =>
      columns?.map((column: any) => {
        if (column.sorter) {
          return {
            ...column,
            sortOrder:
              column.dataIndex === orderBy
                ? sort === "ASC"
                  ? "ascend"
                  : "descend"
                : undefined,
          };
        }
        return column;
      }),
    [columns, orderBy, sort]
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row w-full justify-between mb-6 gap-3">
        <div className="flex flex-col md:flex-row gap-3">
          {withSearch && (
            <Input
              className="md:max-w-48 w-full"
              placeholder="Search..."
              onChange={(e) => onSearchChange(e.target?.value)}
              prefix={<SearchOutlined />}
            />
          )}
          {filterComponents}
        </div>
        {actionComponent}
      </div>
      <Table<T>
        className={clsx(className)}
        dataSource={data}
        columns={enhancedColumns}
        onChange={(pagination, filters, sorter, extra) => {
          if (Array.isArray(sorter)) {
            // Multiple Sorter Logic
          } else {
            if (onSortChange) onSortChange(sorter.field, sorter.order);
          }
          if (onTableChange) {
            onTableChange(pagination, filters, sorter, extra);
          }
        }}
        scroll={{ x: "max-content" }}
        loading={isLoading}
        pagination={{
          responsive: true,
          showSizeChanger: !!pageSizeOptions,
          pageSizeOptions: pageSizeOptions,
          onChange: onPageChange,
          current: currentPage,
          onShowSizeChange: onSizeChange,
          pageSize: pageSize,
          total: total,
          showTotal: (total, range) => `${range[0]} - ${range[1]} of ${total}`,
          showQuickJumper: withQuickPageJumper,
        }}
      />
    </div>
  );
};

export default BaseTable;
