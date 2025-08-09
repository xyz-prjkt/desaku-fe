import { SelectInput } from "@/components/atoms/select";
import { ISelectInputProps } from "@/components/atoms/select/interfaces";
import { useTableAsync } from "@/hooks/useTableAsync";
import { useGetInfiniteAllUsers } from "@/services/user.service";
import { onInfiniteScroll } from "@/utils/infinite-scroll-list";
import { optionsWithDefaultValue } from "@/utils/object-helper";
import { Select, Spin } from "antd";

interface IUserSelectInputFormProps extends ISelectInputProps {
  isForm: true;
  name: string;
  disabledOptions?: string[];
}

interface IUserSelectInputNonFormProps extends Omit<ISelectInputProps, "name"> {
  isForm?: false;
  name?: string;
  disabledOptions?: string[];
}

type IUserSelectInputProps =
  | IUserSelectInputFormProps
  | IUserSelectInputNonFormProps;

export const UserSelectInput = ({
  isForm = true,
  fullWidth,
  name,
  isRequired,
  defaultValue,
  disabledOptions = [],
  ...props
}: IUserSelectInputProps) => {
  const { handleSearchChange, paginateRequest } = useTableAsync({});
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteAllUsers(paginateRequest);

  return isForm ? (
    <SelectInput
      name={name!}
      showSearch
      isRequired={isRequired}
      fullWidth={fullWidth}
      onSearch={handleSearchChange}
      allowClear
      filterOption={false}
      popupMatchSelectWidth={false}
      loading={isLoading || isFetchingNextPage}
      onPopupScroll={(e) =>
        onInfiniteScroll({
          event: e,
          hasNextPage,
          fetchNextPage,
        })
      }
      notFoundContent={isLoading && <Spin size="small" />}
      options={optionsWithDefaultValue(
        [
          ...(defaultValue
            ? [{ id: defaultValue.id, name: defaultValue.name }]
            : []),
        ],
        data?.map((v) => ({
          id: v.id,
          name: v.name,
          disabled: disabledOptions.includes(v.id),
        }))
      )}
      {...props}
    />
  ) : (
    <Select
      showSearch
      onSearch={handleSearchChange}
      allowClear
      filterOption={false}
      popupMatchSelectWidth={false}
      loading={isLoading || isFetchingNextPage}
      onPopupScroll={(e) =>
        onInfiniteScroll({
          event: e,
          hasNextPage,
          fetchNextPage,
        })
      }
      notFoundContent={isLoading && <Spin size="small" />}
      options={optionsWithDefaultValue(
        [
          ...(defaultValue
            ? [{ id: defaultValue.id, name: defaultValue.name }]
            : []),
        ],
        data?.map((v) => ({
          id: v.id,
          name: v.name,
          disabled: disabledOptions.includes(v.id),
        }))
      )}
      {...props}
    />
  );
};
