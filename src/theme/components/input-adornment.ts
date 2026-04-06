import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiInputAdornment: Components<Theme & CssVarsTheme>['MuiInputAdornment'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.MuiInputAdornment-positionEnd': {
        marginRight: theme.spacing(0.25),
      },
      '&.MuiInputAdornment-positionStart': {
        marginLeft: theme.spacing(0.25),
      },
    }),
  },
};
