import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiChip: Components<Theme & CssVarsTheme>['MuiChip'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      minWidth: theme.spacing(7.5),
      variants: [
        {
          props: { size: 'small' },
          style: {
            fontSize: '0.75rem',
            lineHeight: '1.125rem',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            fontSize: '0.75rem',
            lineHeight: '1.125rem',
          },
        },
        // Status colors
        {
          props: { color: 'success' },
          style: {
            backgroundColor: theme.palette._components.status.success.background,
            color: theme.palette._components.status.success.color,
          },
        },
        {
          props: { color: 'success', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.success.outlined,
            borderColor: theme.palette._components.status.success.outlined,
          },
        },
        {
          props: { color: 'error' },
          style: {
            backgroundColor: theme.palette._components.status.error.background,
            color: theme.palette._components.status.error.color,
          },
        },
        {
          props: { color: 'error', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.error.outlined,
            borderColor: theme.palette._components.status.error.outlined,
          },
        },
        {
          props: { color: 'warning' },
          style: {
            backgroundColor: theme.palette._components.status.warning.background,
            color: theme.palette._components.status.warning.color,
          },
        },
        {
          props: { color: 'warning', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.warning.outlined,
            borderColor: theme.palette._components.status.warning.outlined,
          },
        },
        {
          props: { color: 'info' },
          style: {
            backgroundColor: theme.palette._components.status.info.background,
            color: theme.palette._components.status.info.color,
          },
        },
        {
          props: { color: 'info', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.info.outlined,
            borderColor: theme.palette._components.status.info.outlined,
          },
        },
        {
          props: { color: 'primary' },
          style: {
            backgroundColor: theme.palette._components.status.primary.background,
            color: theme.palette._components.status.primary.color,
          },
        },
        {
          props: { color: 'primary', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.primary.outlined,
            borderColor: theme.palette._components.status.primary.outlined,
          },
        },
        {
          props: { color: 'disabled' },
          style: {
            backgroundColor: theme.palette._components.status.disabled.background,
            color: theme.palette._components.status.disabled.color,
          },
        },
        {
          props: { color: 'disabled', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.disabled.outlined,
            borderColor: theme.palette._components.status.disabled.outlined,
          },
        },
        {
          props: { color: 'default' },
          style: {
            backgroundColor: theme.palette._components.status.neutral.background,
            color: theme.palette._components.status.neutral.color,
          },
        },
        {
          props: { color: 'default', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.neutral.outlined,
            borderColor: theme.palette._components.status.neutral.outlined,
          },
        },
        {
          props: { color: 'neutral' },
          style: {
            backgroundColor: theme.palette._components.status.neutral.background,
            color: theme.palette._components.status.neutral.color,
          },
        },
        {
          props: { color: 'neutral', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.neutral.outlined,
            borderColor: theme.palette._components.status.neutral.outlined,
          },
        },
        {
          props: { color: 'orange' },
          style: {
            backgroundColor: theme.palette._components.status.orange.background,
            color: theme.palette._components.status.orange.color,
          },
        },
        {
          props: { color: 'orange', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.orange.outlined,
            borderColor: theme.palette._components.status.orange.outlined,
          },
        },
        {
          props: { color: 'blue' },
          style: {
            backgroundColor: theme.palette._components.status.blue.background,
            color: theme.palette._components.status.blue.color,
          },
        },
        {
          props: { color: 'blue', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.status.blue.outlined,
            borderColor: theme.palette._components.status.blue.outlined,
          },
        },
      ],
    }),
  },
};
