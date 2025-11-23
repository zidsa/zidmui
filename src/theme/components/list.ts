import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiList: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiList'] =
  {
    styleOverrides: {
      root: ({ theme }) => ({
        padding: 0,
        '& .MuiListItem-root': {
          padding: `${theme.spacing(1.5)} 0`,
          borderBottom: `1px solid ${theme.palette.divider}`,
          '&:first-of-type': {
            paddingTop: 0,
          },
        },
        '& .MuiListItem-dense': {
          padding: `${theme.spacing(1)} 0`,
        },
      }),
    },
  };

//

export const MuiListItemText: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiListItemText'] = {
  defaultProps: {
    slotProps: {
      primary: {
        variant: 'body2',
      },
      secondary: {
        variant: 'caption',
        color: 'text.tertiary',
      },
    },
  },
};

export const MuiListItemIcon: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiListItemIcon'] = {
  styleOverrides: {
    root: () => ({
      minWidth: 'auto',
    }),
  },
};

//
