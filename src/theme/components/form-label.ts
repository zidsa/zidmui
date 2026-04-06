import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiFormLabel: Components<Theme & CssVarsTheme>['MuiFormLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.body1,

      marginBottom: theme.spacing(1),
      color: 'inherit',
      [`&.MuiFormLabel-filled`]: {
        color: 'inherit',
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      },
      '&.Mui-focused': {
        color: 'inherit',
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      },
    }),
  },
};
