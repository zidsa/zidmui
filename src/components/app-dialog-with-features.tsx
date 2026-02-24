import { Box, StackProps, CircularProgress, styled } from '@mui/material';

import { AppDialog, AppDialogProps } from './app-dialog';
import { AppInputSearchProps, AppInputBaseSearch } from './app-input-base-search';
import { AppPagination, AppPaginationProps } from './app-pagination';
import { StackColumn } from './stack-column';
import { StackRow } from './stack-row';

//
//

type AppDialogWithFeaturesProps = AppDialogProps & {
  open: boolean;
  onClose: () => void;
  search: string;
  onSearchChange?: (search: string) => void;
  searchProps?: AppInputSearchProps;
  pagination?: AppPaginationProps;
  isLoading?: boolean;
  contentProps?: StackProps;
  children?: React.ReactNode;
};

export const AppDialogWithFeatures: React.FC<AppDialogWithFeaturesProps> = ({
  open,
  onClose,
  search,
  onSearchChange,
  title,
  searchProps,
  pagination,
  children,
  isLoading,
  contentProps,
  ...props
}) => {
  return (
    <AppDialog
      open={open}
      onClose={onClose}
      title={title}
      fullWidth
      dialogContentProps={{ sx: { overflow: 'hidden' } }}
      {...props}
    >
      <Content>
        {isLoading && (
          <StackRow width="100%" height={160} alignItems="center" justifyContent="center">
            <CircularProgress />
          </StackRow>
        )}

        {!isLoading && (
          <>
            {/* Search */}
            {(search || onSearchChange) && (
              <SearchInput
                fullWidth
                value={search}
                onChange={e => onSearchChange?.(e.target.value)}
                name="search"
                size="small"
                {...searchProps}
              />
            )}

            {/* Main content */}
            <StackColumn gap={2} maxHeight="500px" overflow="auto" {...contentProps}>
              {children}
            </StackColumn>

            {/* Pagination */}
            {pagination && (
              <StackRow alignItems="center" justifyContent="center">
                <AppPagination
                  size="medium"
                  count={pagination.count}
                  page={pagination.page}
                  onChange={pagination.onChange}
                />
              </StackRow>
            )}
          </>
        )}
      </Content>
    </AppDialog>
  );
};

//

const SearchInput = styled(AppInputBaseSearch)(({ theme }) => ({
  marginTop: 0,
  '.MuiInputBase-root': {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    fieldset: {
      borderRadius: theme.spacing(40),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },

    input: { paddingLeft: theme.spacing(1) },
  },
  '.MuiInputAdornment-root': {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    pointerEvents: 'none',
  },
}));

const Content = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  gap: theme.spacing(2),
}));
