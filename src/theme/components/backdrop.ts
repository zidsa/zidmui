import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

export const MuiBackdrop: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiBackdrop'] = {
  styleOverrides: {
    root: {
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
  },
};
