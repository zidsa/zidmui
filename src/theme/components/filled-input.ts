import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiFilledInput: Components<Theme & CssVarsTheme>['MuiFilledInput'] = {
  styleOverrides: {
    root: {
      borderRadius: 8,
      '&::before, &::after': {
        borderBottom: 0,
      },
      '&:hover:not(.Mui-disabled, .Mui-error):before': {
        borderBottom: 0,
      },
      '&.Mui-focused:after': {
        borderBottom: 0,
      },
    },
  },
};
