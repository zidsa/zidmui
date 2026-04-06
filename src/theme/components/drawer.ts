import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiDrawer: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiDrawer'] = {
  styleOverrides: {
    root: {
      overflow: 'hidden',
    },
    paper: {
      padding: '16px 0 0 0',
    },
    modal: {
      maxHeight: '100vh',
    },

    paperAnchorLeft: {
      width: 390,
      maxWidth: 'calc(100vw - 24px)',
      borderRadius: '0 16px 16px 0',
    },

    paperAnchorRight: {
      width: 390,
      maxWidth: 'calc(100vw - 24px)',
      borderRadius: '16px 0 0 16px',
    },

    paperAnchorTop: {
      height: 390,
      maxHeight: 'calc(100vh - 24px)',
      borderRadius: '0 0 16px 16px',
    },

    paperAnchorBottom: {
      height: 390,
      maxHeight: 'calc(100vh - 24px)',
      borderRadius: '16px 16px 0 0',
    },
  },
};
