import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiAccordion: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiAccordion'] = {
  defaultProps: {
    disableGutters: true,
    elevation: 0,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      borderRadius: theme.spacing(2),
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
    }),
  },
  variants: [
    {
      props: { color: 'primary' },
      style: ({ theme }) => ({
        '&.Mui-expanded': {
          backgroundColor: theme.palette._components.accordion.primary.background,
          borderColor: theme.palette._components.accordion.primary.border,
        },
      }),
    },
    {
      props: { color: 'success' },
      style: ({ theme }) => ({
        '&.Mui-expanded': {
          backgroundColor: theme.palette._components.accordion.success.background,
          borderColor: theme.palette._components.accordion.success.border,
        },
      }),
    },
    {
      props: { color: 'error' },
      style: ({ theme }) => ({
        '&.Mui-expanded': {
          backgroundColor: theme.palette._components.accordion.error.background,
          borderColor: theme.palette._components.accordion.error.border,
        },
      }),
    },
    {
      props: { color: 'warning' },
      style: ({ theme }) => ({
        '&.Mui-expanded': {
          backgroundColor: theme.palette._components.accordion.warning.background,
          borderColor: theme.palette._components.accordion.warning.border,
        },
      }),
    },
    {
      props: { color: 'info' },
      style: ({ theme }) => ({
        '&.Mui-expanded': {
          backgroundColor: theme.palette._components.accordion.info.background,
          borderColor: theme.palette._components.accordion.info.border,
        },
      }),
    },
    {
      props: { color: 'neutral' },
      style: ({ theme }) => ({
        '&.Mui-expanded': {
          backgroundColor: theme.palette._components.accordion.neutral.background,
          borderColor: theme.palette._components.accordion.neutral.border,
        },
      }),
    },
  ],
};

export const MuiAccordionSummary: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiAccordionSummary'] = {
  styleOverrides: {
    root: () => ({}),
  },
};

export const MuiAccordionDetails: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiAccordionDetails'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      background: theme.palette.background.paper,
    }),
  },
};
