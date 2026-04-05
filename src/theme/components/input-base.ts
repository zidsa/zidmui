import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

export const MuiInputBase: Components<Theme & CssVarsTheme>['MuiInputBase'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      '&.MuiInputBase-root': {
        background: theme.palette.background.white,
      },
    }),
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
