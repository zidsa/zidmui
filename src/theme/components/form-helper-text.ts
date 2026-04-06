import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiFormHelperText: Components<Theme & CssVarsTheme>['MuiFormHelperText'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.caption,

      marginInline: 0,
      marginTop: theme.spacing(1),
      color: 'inherit',
      [`&.MuiFormHelperText-root`]: {
        color: theme.palette.text.tertiary,
      },
      [`&.MuiFormHelperText-filled`]: {
        color: theme.palette.text.tertiary,
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      },
      '&.Mui-focused': {
        // color: 'inherit',
        '&.Mui-error': {
          color: theme.palette.error.main,
        },
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      },
      [`&.Mui-error`]: {
        color: theme.palette.error.main,
      },
      variants: [
        {
          props: { error: true },
          style: {
            color: theme.palette.error.main,
          },
        },
      ],
    }),
  },
};
