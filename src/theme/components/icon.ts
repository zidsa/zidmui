import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

export const MuiIcon: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiIcon'] =
  {
    defaultProps: {
      fontSize: 'medium',
      color: 'primary',
    },
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        variants: [
          {
            props: { fontSize: 'large' },
            style: {
              minWidth: theme.spacing(6),
              minHeight: theme.spacing(6),
            },
            '> svg': {
              width: theme.spacing(3),
              height: theme.spacing(3),
            },
          },
          {
            props: { fontSize: 'medium' },
            style: {
              minWidth: theme.spacing(5),
              minHeight: theme.spacing(5),
            },
            '> svg': {
              width: theme.spacing(2.5),
              height: theme.spacing(2.5),
            },
          },
          {
            props: { fontSize: 'small' },
            style: {
              minWidth: theme.spacing(4),
              minHeight: theme.spacing(4),
              '> svg': {
                width: theme.spacing(2),
                height: theme.spacing(2),
              },
            },
          },
          {
            props: { color: 'primary' },
            style: {
              backgroundColor: 'transparent',
              color: theme.palette._components.iconButton.primary.text,
              border: `1px solid ${theme.palette._components.button.primary.contained}`,
            },
          },
          {
            props: { color: 'secondary' },
            style: {
              backgroundColor: 'transparent',
              color: theme.palette._components.iconButton.secondary.text,
              border: `1px solid ${theme.palette._components.button.secondary.border}`,
            },
          },
          {
            props: { color: 'error' },
            style: {
              backgroundColor: 'transparent',
              color: theme.palette._components.button.error.focused,
              border: `1px solid ${theme.palette._components.button.error.border}`,
            },
          },
        ],
      }),
    },
  };
