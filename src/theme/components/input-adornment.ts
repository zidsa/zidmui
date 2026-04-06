import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiInputAdornment: Components<Theme & CssVarsTheme>['MuiInputAdornment'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      margin: 0,
      '&.MuiInputAdornment-positionEnd': {
        marginLeft: theme.spacing(1),
      },
      '&.MuiInputAdornment-positionStart': {
        marginRight: theme.spacing(1),
      },
    }),
  },
};
