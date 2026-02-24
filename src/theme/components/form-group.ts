import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiFormGroup: Components<Theme & CssVarsTheme>['MuiFormGroup'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      gap: theme.spacing(1),
    }),
  },
};
