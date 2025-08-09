/**
 * Groups an array of objects by a specified key.
 * @param items - The array of objects to group.
 * @param keyFn - A function to extract the grouping key from an object.
 * @returns An object with keys as group names and values as arrays of grouped items.
 */
const groupBy = <T, K extends keyof any>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> => {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<K, T[]>);
};

interface Item<T, U> {
  id: T;
  name: U;
  disabled?: boolean;
}
const optionsWithDefaultValue = <T, U>(
  initialData: Item<T, U>[],
  data: Item<T, U>[] | undefined
): { value: T; label: U }[] => {
  const initialOptions = initialData.map((item) => ({
    value: item.id,
    label: item.name,
    ...(item.disabled !== undefined && { disabled: item.disabled }),
  }));

  const options =
    data?.map((v) => ({
      value: v.id,
      label: v.name,
      ...(v.disabled !== undefined && { disabled: v.disabled }),
    })) || [];

  const uniqueOptionsMap = new Map<
    T,
    { value: T; label: U; disabled?: boolean }
  >();

  initialOptions.forEach((initialOption) => {
    if (initialOption.value !== undefined) {
      uniqueOptionsMap.set(initialOption.value, initialOption);
    }
  });

  options.forEach((option) => {
    if (option.value !== undefined && !uniqueOptionsMap.has(option.value)) {
      uniqueOptionsMap.set(option.value, option);
    }
  });

  return Array.from(uniqueOptionsMap.values());
};

/**
 * Transforms empty strings to null for specified fields in an object.
 * Useful for form submissions where optional fields should be null instead of empty strings.
 * @param data - The object to transform
 * @param fields - Array of field names that should be transformed from empty string to null
 * @returns A new object with empty strings converted to null for specified fields
 */
const transformEmptyStringsToNull = <T extends Record<string, any>>(
  data: T,
  fields: (keyof T)[]
): T => {
  const result = { ...data };
  fields.forEach((field) => {
    if (result[field] === "" || result[field] === undefined) {
      result[field] = null as any;
    }
  });
  return result;
};

export { groupBy, optionsWithDefaultValue, transformEmptyStringsToNull };
