import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiDialog: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiDialog'] = {
  defaultProps: {
    disableRestoreFocus: true,
  },
  styleOverrides: {
    paper: ({ theme }) => ({
      maxHeight: '80vh',
      borderRadius: theme.spacing(1.5),
      [theme.breakpoints.down('sm')]: {
        maxHeight: '90vh',
      },
    }),
  },
};

//

export const MuiDialogTitle: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiDialogTitle'] = {
  defaultProps: {
    variant: 'h5',
  },
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2),
    }),
  },
};

//

export const MuiDialogContent: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiDialogContent'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2),
    }),
  },
};

//

export const MuiDialogActions: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiDialogActions'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      padding: theme.spacing(2),
      paddingTop: theme.spacing(1),
    }),
  },
};
