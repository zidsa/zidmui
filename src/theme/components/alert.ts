import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

//

export const MuiAlert: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiAlert'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 12,
      flexWrap: 'wrap',
      [theme.breakpoints.down('md')]: {
        paddingInline: theme.spacing(1),
      },
      '&.MuiAlert-colorError': {
        color: 'inherit',
        borderColor: theme.palette._components.alert.error.border,
        background: theme.palette._components.alert.error.background,
        '.MuiAlert-icon': {
          color: theme.palette.colors.red[400],
        },
        '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
          fill: theme.palette._components.alert.error.color,
        },
      },
      '.MuiTypography-root.MuiAlertTitle-root': {
        margin: 0,
      },
      '.MuiAlert-icon': {
        flex: 0,
        paddingBlock: theme.spacing(0.75),
        alignItems: 'flex-start',
      },
      '.MuiAlert-message': {
        flex: 1,
        paddingBlock: theme.spacing(0.75),
        display: 'flex',
        alignItems: 'center',
      },
      '.MuiAlert-action': {
        paddingTop: theme.spacing(0.25),
        marginRight: 0,
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
          paddingLeft: theme.spacing(0.5),
        },
      },
      '&.MuiAlert-colorWarning': {
        color: 'inherit',
        borderColor: theme.palette._components.alert.warning.border,
        background: theme.palette._components.alert.warning.background,
        '.MuiAlert-icon': {
          color: theme.palette.colors.yellow[700],
        },
        '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
          fill: theme.palette._components.alert.warning.color,
        },
      },
      '&.MuiAlert-colorInfo': {
        color: 'inherit',
        borderColor: theme.palette._components.alert.info.border,
        background: theme.palette._components.alert.info.background,
        '.MuiAlert-icon': {
          color: theme.palette.colors.blue[900],
        },
        '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
          fill: theme.palette._components.alert.info.color,
        },
      },
      '&.MuiAlert-colorSuccess': {
        color: 'inherit',
        borderColor: theme.palette._components.alert.success.border,
        background: theme.palette._components.alert.success.background,
        '.MuiAlert-icon': {
          color: theme.palette.colors.green[600],
        },
        '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
          fill: theme.palette._components.alert.success.color,
        },
      },
    }),
  },
};
