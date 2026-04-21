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
      border: `1px solid ${theme.palette.divider}`,
      backgroundColor: theme.palette.background.paper,
      overflow: 'hidden',
      '&.Mui-disabled': {
        backgroundColor: theme.palette.action.disabledBackground,
      },
      ':first-of-type': {
        borderTopLeftRadius: theme.spacing(2),
        borderTopRightRadius: theme.spacing(2),
      },
      ':last-of-type': {
        borderBottomLeftRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
      },
      '&[data-rounded-corners="all"]': {
        borderRadius: theme.spacing(2),
      },
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
    root: ({ theme }) => ({
      marginInline: theme.spacing(0.5),
    }),
    content: ({ theme }) => ({
      marginBlock: theme.spacing(2),
    }),
  },
};

export const MuiAccordionDetails: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiAccordionDetails'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(1.5),
      background: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      padding: theme.spacing(2),
      marginInline: theme.spacing(0.5),
      marginBottom: theme.spacing(0.5),
      borderBottomLeftRadius: theme.spacing(1.5),
      borderBottomRightRadius: theme.spacing(1.5),
      '.MuiAccordion-root[data-color] &': {
        borderRadius: theme.spacing(1.5),
        marginTop: '-2px',
      },
      // When parent Accordion has no color
      '.MuiAccordion-root:not([data-color]) &': {
        borderTop: `1px solid ${theme.palette.divider}`,
        marginTop: 0,
      },
      '.Mui-disabled &': {
        opacity: 0.5,
      },
    }),
  },
};
