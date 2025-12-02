import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiInputLabel: Components<Theme & CssVarsTheme>['MuiInputLabel'] = {
  defaultProps: {
    shrink: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      ...theme.typography.caption,
      lineHeight: '1.2em',
    }),
  },
};
