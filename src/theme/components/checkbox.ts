import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiCheckbox: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiCheckbox'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      paddingBlock: theme.spacing(0.75),
      '&.Mui-checked': {
        color: theme.palette.colors.primary[1000],
      },
    }),
  },
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
};
