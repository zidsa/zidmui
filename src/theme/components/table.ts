import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiTable: Components<Theme & CssVarsTheme>['MuiTable'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      border: 'none',

      '.MuiTableHead-root': {
        '.MuiTableCell-root': {
          borderBottom: `1px solid ${theme.palette.background.gray200}`,
          borderTop: `1px solid ${theme.palette.background.gray200}`,
          background: theme.palette.background.gray,
          verticalAlign: 'baseline',
        },
        whiteSpace: 'nowrap',
      },

      '.MuiTableBody-root': {
        '.MuiTableRow-root': {
          '.MuiTableCell-root': {
            borderBottom: `1px solid ${theme.palette.background.gray200}`,
            borderTop: `1px solid ${theme.palette.background.gray200}`,
          },
        },

        '.MuiTableRow-root:last-child': {
          '.MuiTableCell-root': {
            borderBottom: 'none',
          },
        },
      },
    }),
  },
};

export const MuiTableRow: Components<Theme & CssVarsTheme>['MuiTableRow'] = {
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      ...(ownerState['disable-row-hover']
        ? {}
        : {
            '&:hover': {
              backgroundColor: theme.palette.background.gray,
            },
          }),
    }),
  },
};
