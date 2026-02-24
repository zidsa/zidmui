import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

export const MuiDivider: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiDivider'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderColor: theme.palette.divider,
    }),
  },
};
