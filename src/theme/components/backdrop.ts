import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiBackdrop: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiBackdrop'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      backgroundColor: theme.palette._components.backdrop.fill,
    }),
  },
};
