import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

export const MuiCard: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiCard'] =
  {
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: 16,

        '& > .MuiCardContent-root:last-child': {
          paddingBottom: 16,
        },

        '& .MuiCardContent-root .MuiCardContent-root': {
          borderRadius: 8,
          border: `1px solid ${theme.palette.outlined.outlined_2}`,
          padding: 16,
        },

        '& .MuiCardContent-root .MuiCardContent-root .MuiCardContent-root': {
          borderRadius: 4,
          backgroundColor: theme.palette.background.gray,
          border: 'none',
        },

        form: {
          marginBottom: 0,
        },

        '& .MuiList-root:last-child  .MuiListItem-root:last-of-type': {
          borderBottom: 'none',
          paddingBottom: 0,
        },
      }),
    },
  };
