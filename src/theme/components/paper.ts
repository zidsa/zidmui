import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiPaper: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiPaper'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      border: `1px solid ${theme.palette.outlined?.outlined_2}`,
    }),
  },
};
