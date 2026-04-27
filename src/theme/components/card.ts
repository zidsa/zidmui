import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

const coloredCardContentStyle = (theme: Theme) => ({
  '& .MuiCardContent-root': {
    padding: 16,
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      paddingBottom: 16,
    },
  },
});

export const MuiCard: Components<Omit<Theme, 'components' | 'palette'> & CssVarsTheme>['MuiCard'] =
  {
    styleOverrides: {
      root: ({ theme }) => ({
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(1.25),
        borderRadius: theme.shape.standardBorderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        overflow: 'hidden',

        '& .MuiCardContent-root': {
          padding: 8,
          borderRadius: theme.spacing(2),
          margin: `0 ${theme.spacing(0.5)} ${theme.spacing(0.5)}`,
          '&:last-child': {
            paddingBottom: 8,
            borderRadius: theme.spacing(1.25),
          },
        },

        // TODO: check
        '& .MuiCardContent-root .MuiCardContent-root .MuiCardContent-root': {
          border: 'none',
          borderRadius: 4,
          backgroundColor: theme.palette.background.gray,
        },
        boxShadow: 'none',
      }),
    },
    variants: [
      {
        props: { color: 'primary' },
        style: ({ theme }) => ({
          borderColor: theme.palette._components.card.primary.border,
          backgroundColor: theme.palette._components.card.primary.background,
          ...coloredCardContentStyle(theme),
        }),
      },
      {
        props: { color: 'success' },
        style: ({ theme }) => ({
          borderColor: theme.palette._components.card.success.border,
          backgroundColor: theme.palette._components.card.success.background,
          ...coloredCardContentStyle(theme),
        }),
      },
      {
        props: { color: 'error' },
        style: ({ theme }) => ({
          borderColor: theme.palette._components.card.error.border,
          backgroundColor: theme.palette._components.card.error.background,
          ...coloredCardContentStyle(theme),
        }),
      },
      {
        props: { color: 'warning' },
        style: ({ theme }) => ({
          borderColor: theme.palette._components.card.warning.border,
          backgroundColor: theme.palette._components.card.warning.background,
          ...coloredCardContentStyle(theme),
        }),
      },
      {
        props: { color: 'info' },
        style: ({ theme }) => ({
          borderColor: theme.palette._components.card.info.border,
          backgroundColor: theme.palette._components.card.info.background,
          ...coloredCardContentStyle(theme),
        }),
      },
      {
        props: { color: 'neutral' },
        style: ({ theme }) => ({
          borderColor: theme.palette._components.card.neutral.border,
          backgroundColor: theme.palette._components.card.neutral.background,
          ...coloredCardContentStyle(theme),
        }),
      },
    ],
  };
