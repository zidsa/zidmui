import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiAutocomplete: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiAutocomplete'] = {
  styleOverrides: {
    root: () => ({
      '& .MuiOutlinedInput-root': {
        paddingTop: 0,
        paddingBottom: 0,
      },
    }),
  },
};
