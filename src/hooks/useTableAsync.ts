import {
  IPaginateRequest,
  TSort,
} from "@/components/molecules/table/interfaces";
import { useState, useEffect, useCallback } from "react";

export interface ITableAsyncHookProps<T> {
  initialOrderBy?: string;
  initialSort?: TSort;
  initialSearch?: string;
  initialValues?: Partial<T>;
}

export const useTableAsync = <T extends object = object>({
  initialOrderBy = undefined,
  initialSort = undefined,
  initialSearch = "",
  initialValues = {},
}: ITableAsyncHookProps<T>) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch);
  const [paginateRequest, setPaginateRequest] = useState<IPaginateRequest & T>({
    page: 1,
    limit: 10,
    sort: initialSort,
    orderBy: initialOrderBy,
    search: initialSearch,
    ...initialValues,
  } as IPaginateRequest & T);

  // Update paginateRequest when searchQuery changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setPaginateRequest((prev) => ({
        ...prev,
        search: searchQuery,
        page: 1, // Reset to page 1 when search changes
      }));
    }, 1000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [searchQuery]);

  // Handle changes in pagination
  const handlePageChange = useCallback((page: number, limit: number) => {
    setPaginateRequest((prev) => ({
      ...prev,
      limit: limit,
      page: page,
    }));
  }, []);

  const handleOptionalChange = useCallback(
    <K extends keyof (IPaginateRequest & T)>(
      key: K,
      value: (IPaginateRequest & T)[K]
    ) => {
      setPaginateRequest((prevState) => ({
        ...prevState,
        page: 1,
        [key]: value,
      }));
    },
    []
  );

  // Handle sorting change
  const handleSortChange = useCallback(
    (orderBy: string | any, orderDirection: "descend" | "ascend" | any) => {
      setPaginateRequest((prev) => {
        const prevOrder = prev.sort;
        const prevOrderBy = prev.orderBy;

        const fixedOrder =
          orderDirection === "descend"
            ? "DESC"
            : orderDirection === "ascend"
            ? "ASC"
            : undefined;

        // Check if order or orderBy has actually changed
        if (prevOrder !== fixedOrder || prevOrderBy !== orderBy) {
          console.log("Sorting has changed!");
          return {
            ...prev,
            order: fixedOrder,
            orderBy: orderBy,
            currentPage: 1,
          };
        }

        // If no change in order or orderBy, return previous state unchanged
        return prev;
      });
    },
    []
  );

  // Handle search change
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  return {
    paginateRequest,
    searchQuery,
    handlePageChange,
    handleSearchChange,
    handleSortChange,
    handleOptionalChange,
    setSearchQuery,
    setPaginateRequest,
  };
};
