import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

export const MuiOutlinedInput: Components<Theme & CssVarsTheme>['MuiOutlinedInput'] = {
  styleOverrides: {
    notchedOutline: ({ theme }) => ({
      borderColor: theme.palette._components.input.outlined.enabledBorder,
    }),
  },
};
