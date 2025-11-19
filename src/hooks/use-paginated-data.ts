import { useMemo, useState } from 'react';

//
//

export type UsePaginatedDataProps<T> = {
  data: T[];
  perPage?: number;
};

export const usePaginatedData = <T>({ data, perPage }: UsePaginatedDataProps<T>) => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(perPage ?? 10);

  const paginatedData = useMemo(
    () => data.slice((page - 1) * limit, page * limit),
    [data, page, limit],
  );

  const onPageChange = (page?: number) => setPage(page || 1);

  const onLimitChange = (limit?: number) => {
    setLimit(limit || 5);
    setPage(1);
  };

  return {
    data: paginatedData,
    page,
    limit,
    setPage,
    setLimit,
    onPageChange,
    onLimitChange,
    pagesCount: Math.ceil(data.length / limit),
  };
};
