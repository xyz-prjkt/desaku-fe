type OnInfiniteScrollProps = {
  event: React.UIEvent<HTMLElement>;
  hasNextPage: boolean;
  fetchNextPage: () => Promise<unknown>;
};

const onInfiniteScroll = async ({
  event,
  hasNextPage,
  fetchNextPage,
}: OnInfiniteScrollProps) => {
  const target = event.target as HTMLElement;
  if (
    hasNextPage &&
    target.scrollTop + target.offsetHeight === target.scrollHeight
  ) {
    target.scrollTo(0, target.scrollHeight);
    await fetchNextPage();
  }
};

const getNextPageParams = (res: {
  meta?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}) => {
  if (res.meta && res.meta.current_page < res.meta.last_page)
    return res.meta.current_page + 1;
  return undefined;
};

export { onInfiniteScroll, getNextPageParams, OnInfiniteScrollProps };
