import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiSvgIcon: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiSvgIcon'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      transition: theme.transitions.create('color', {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
    }),
  },
};
