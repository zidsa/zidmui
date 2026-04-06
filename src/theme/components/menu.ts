import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiMenu: Components<Theme & CssVarsTheme>['MuiMenu'] = {
  defaultProps: {
    disableRestoreFocus: true,
    disableAutoFocusItem: true,
  },
  styleOverrides: {
    paper: ({ theme }) => ({
      borderRadius: theme.spacing(1.5),
      marginTop: theme.spacing(1),
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: theme.palette.outlined?.outlined,
    }),
  },
};

export const MuiMenuItem: Components<Theme & CssVarsTheme>['MuiMenuItem'] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
};
