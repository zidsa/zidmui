import { Pagination, type PaginationProps } from '@mui/material';

//
//

export type AppPaginationProps = Omit<PaginationProps, 'variant' | 'color' | 'shape' | 'size'> & {
  size?: 'medium' | 'large';
};

export const AppPagination = (props: AppPaginationProps) => {
  return (
    <Pagination
      variant="outlined"
      size="medium"
      shape="rounded"
      showFirstButton
      showLastButton
      {...props}
    />
  );
};
