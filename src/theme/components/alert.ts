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
      variants: [
        // Standard variants
        {
          props: { variant: 'standard', severity: 'error' },
          style: {
            color: 'inherit',
            borderColor: theme.palette._components.alert.standard.error.border,
            background: theme.palette._components.alert.standard.error.background,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.standard.error.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.standard.error.color,
            },
          },
        },
        {
          props: { variant: 'standard', severity: 'warning' },
          style: {
            color: 'inherit',
            borderColor: theme.palette._components.alert.standard.warning.border,
            background: theme.palette._components.alert.standard.warning.background,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.standard.warning.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.standard.warning.color,
            },
          },
        },
        {
          props: { variant: 'standard', severity: 'info' },
          style: {
            color: 'inherit',
            borderColor: theme.palette._components.alert.standard.info.border,
            background: theme.palette._components.alert.standard.info.background,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.standard.info.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.standard.info.color,
            },
          },
        },
        {
          props: { variant: 'standard', severity: 'success' },
          style: {
            color: 'inherit',
            borderColor: theme.palette._components.alert.standard.success.border,
            background: theme.palette._components.alert.standard.success.background,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.standard.success.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.standard.success.color,
            },
          },
        },
        {
          props: { variant: 'standard', color: 'primary' },
          style: {
            color: 'inherit',
            borderColor: theme.palette._components.alert.standard.primary.border,
            background: theme.palette._components.alert.standard.primary.background,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.standard.primary.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.standard.primary.color,
            },
          },
        },
        {
          props: { variant: 'standard', color: 'gray' },
          style: {
            color: 'inherit',
            borderColor: theme.palette._components.alert.standard.gray.border,
            background: theme.palette._components.alert.standard.gray.background,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.standard.gray.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.standard.gray.color,
            },
          },
        },
        // Filled variants
        {
          props: { variant: 'filled', severity: 'error' },
          style: {
            borderColor: 'transparent',
            background: theme.palette._components.alert.filled.error.background,
            color: theme.palette._components.alert.filled.error.color,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.filled.error.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.filled.error.color,
            },
          },
        },
        {
          props: { variant: 'filled', severity: 'warning' },
          style: {
            borderColor: 'transparent',
            background: theme.palette._components.alert.filled.warning.background,
            color: theme.palette._components.alert.filled.warning.color,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.filled.warning.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.filled.warning.color,
            },
          },
        },
        {
          props: { variant: 'filled', severity: 'info' },
          style: {
            borderColor: 'transparent',
            background: theme.palette._components.alert.filled.info.background,
            color: theme.palette._components.alert.filled.info.color,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.filled.info.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.filled.info.color,
            },
          },
        },
        {
          props: { variant: 'filled', severity: 'success' },
          style: {
            borderColor: 'transparent',
            background: theme.palette._components.alert.filled.success.background,
            color: theme.palette._components.alert.filled.success.color,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.filled.success.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.filled.success.color,
            },
          },
        },
        {
          props: { variant: 'filled', color: 'primary' },
          style: {
            borderColor: 'transparent',
            background: theme.palette._components.alert.filled.primary.background,
            color: theme.palette._components.alert.filled.primary.color,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.filled.primary.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.filled.primary.color,
            },
          },
        },
        {
          props: { variant: 'filled', color: 'gray' },
          style: {
            borderColor: 'transparent',
            background: theme.palette._components.alert.filled.gray.background,
            color: theme.palette._components.alert.filled.gray.color,
            '.MuiAlert-icon': {
              color: theme.palette._components.alert.filled.gray.icon,
            },
            '.MuiAlert-action .MuiSvgIcon-fontSizeSmall': {
              fill: theme.palette._components.alert.filled.gray.color,
            },
          },
        },
      ],
    }),
  },
};
