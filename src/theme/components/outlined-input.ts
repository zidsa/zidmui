import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiOutlinedInput: Components<Theme & CssVarsTheme>['MuiOutlinedInput'] = {
  styleOverrides: {
    notchedOutline: ({ theme }) => ({
      borderColor: theme.palette._components.input.outlined.enabledBorder,
    }),
  },
};
