import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiInputBase: Components<Theme & CssVarsTheme>['MuiInputBase'] = {
  styleOverrides: {
    input: ({ theme }) => ({
      ...theme.typography.body2,

      '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        WebkitAppearance: 'none',
      },

      /* Firefox */
      '&[type=number]': {
        MozAppearance: 'textfield',
      },
    }),
  },
};
