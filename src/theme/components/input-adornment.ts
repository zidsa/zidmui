import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

export const MuiInputAdornment: Components<Theme & CssVarsTheme>['MuiInputAdornment'] = {
  defaultProps: { disableTypography: true },
  styleOverrides: {
    root: ({ theme }) => ({
      minHeight: 'inherit',
      background: theme.palette.background.default,
      padding: `0 ${theme.spacing(1.5)}`,
      border: `0 ${theme.palette._components.input.outlined.enabledBorder} solid`,
      color: theme.palette.text.tertiary,
      fontSize: theme.typography.body2.fontSize,

      '&.MuiInputAdornment-positionEnd': {
        marginRight: '-14px',
        borderStartEndRadius: theme.spacing(1),
        borderEndEndRadius: theme.spacing(1),
        borderInlineStartWidth: theme.spacing(0.125),
        '[dir="rtl"] &': {
          marginRight: 0,
          marginLeft: 0,
        },
      },

      '&.MuiInputAdornment-positionStart': {
        marginLeft: '-14px',
        borderStartStartRadius: theme.spacing(1),
        borderEndStartRadius: theme.spacing(1),
        borderInlineEndWidth: theme.spacing(0.125),
        '[dir="rtl"] &': {
          marginLeft: 0,
          marginRight: 0,
        },
      },

      '.MuiInputBase-multiline > &': {
        background: 'transparent',
        minHeight: 'unset',
        border: 'none',
        margin: 0,
        padding: 0,
      },
    }),
  },
};
