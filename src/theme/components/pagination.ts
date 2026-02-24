import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiPagination: Components<Theme & CssVarsTheme>['MuiPagination'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '.MuiPaginationItem-root': {
        color: theme.palette.text.primary,

        '&.MuiPaginationItem-sizeMedium': {
          fontSize: '0.875rem',
        },

        '&.MuiPaginationItem-sizeLarge': {
          fontSize: '0.875rem',
        },

        '&.MuiPaginationItem-outlined': {
          '&.MuiPaginationItem-page': {
            border: `1px solid ${theme.palette.outlined?.outlined}`,
          },

          '&.MuiPaginationItem-previousNext': {
            border: `1px solid ${theme.palette.outlined?.outlined}`,

            '&.MuiButtonBase-root.Mui-disabled': {
              opacity: 1,
              border: `1px solid ${theme.palette.outlined?.outlined}`,

              '.MuiSvgIcon-root': {
                opacity: 0.38,
              },
            },
          },

          '&.MuiPaginationItem-firstLast': {
            border: `1px solid ${theme.palette.outlined?.outlined}`,

            '&.MuiButtonBase-root.Mui-disabled': {
              opacity: 1,
              border: `1px solid ${theme.palette.outlined?.outlined}`,

              '.MuiSvgIcon-root': {
                opacity: 0.38,
              },
            },
          },

          '&.MuiButtonBase-root.Mui-selected': {
            backgroundColor: theme.palette.background.gray,
          },

          '.MuiTouchRipple-root': {
            borderRadius: theme.spacing(0.875),
          },
        },

        '.MuiTouchRipple-root': {
          display: 'none',
        },
      },
    }),
  },
};
