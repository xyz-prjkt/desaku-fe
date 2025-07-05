import { TablePaginationConfig, TableProps } from "antd";
import { ReactNode } from "react";

export type TSort = "ASC" | "DESC";

export interface IPaginateRequest {
  search?: string;
  limit?: number;
  page?: number;
  sort?: TSort;
  orderBy?: string;
}

export interface IBaseTableProps<T = unknown> {
  onPageChange?: TablePaginationConfig["onChange"];
  onSizeChange?: TablePaginationConfig["onShowSizeChange"];
  onTableChange?: TableProps<T>["onChange"];
  onSearchChange?: (v: string) => void;
  columns: TableProps<T>["columns"];
  data: TableProps<T>["dataSource"];
  withSearch?: boolean;
  filterComponents?: ReactNode;
  actionComponent?: ReactNode;
  pageSizeOptions?: number[];
  withQuickPageJumper?: boolean;
  sort?: string;
  orderBy?: string;
  className?: string;
  isLoading?: boolean;
  total?: number;
  currentPage?: number;
  pageSize?: number;
  onSortChange?: (
    orderBy: string | any,
    orderDirection: "descend" | "ascend" | any
  ) => void;
}
