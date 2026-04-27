import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiPopover: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiPopover'] = {
  styleOverrides: {
    paper: ({ theme }) => ({
      background: theme.palette.background.paper,
    }),
  },
};
