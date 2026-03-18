import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiFormControlLabel: Components<Theme & CssVarsTheme>['MuiFormControlLabel'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      marginInline: 0,
      '.MuiFormControlLabel-label': {
        ...theme.typography.body2,
      },
    }),
  },
};
