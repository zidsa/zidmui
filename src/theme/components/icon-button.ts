import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

export const MuiIconButton: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiIconButton'] = {
  defaultProps: {
    disableRipple: true,
    disableTouchRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      '&.Mui-focusVisible': {
        backgroundColor: theme.palette._components.iconButton.default.hover,
        outline: `2px solid ${theme.palette.primary.dark}`,
        outlineOffset: '2px',
      },
      '&.Mui-disabled': {
        color: theme.palette._components.button.disabledText,
      },
      '&.MuiIconButton-loading .MuiSvgIcon-root': {
        fill: 'rgba(0,0,0,0) !important',
      },

      variants: [
        {
          props: { size: 'large' },
          style: {
            minWidth: theme.spacing(6),
            minHeight: theme.spacing(6),
            padding: theme.spacing(1),
            '> .MuiSvgIcon-root': {
              width: theme.spacing(3),
              minWidth: theme.spacing(3),
              height: theme.spacing(3),
              minHeight: theme.spacing(3),
            },
          },
        },
        {
          props: { size: 'medium' },
          style: {
            minWidth: theme.spacing(5),
            minHeight: theme.spacing(5),
            padding: theme.spacing(0.65),
            '> .MuiSvgIcon-root': {
              width: theme.spacing(2.5),
              minWidth: theme.spacing(2.5),
              height: theme.spacing(2.5),
              minHeight: theme.spacing(2.5),
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            minWidth: theme.spacing(4),
            minHeight: theme.spacing(4),
            padding: theme.spacing(0.75),
            '> .MuiSvgIcon-root': {
              width: theme.spacing(2.5),
              minWidth: theme.spacing(2.5),
              height: theme.spacing(2.5),
              minHeight: theme.spacing(2.5),
            },
          },
        },
        {
          props: { size: 'extraSmall' },
          style: {
            minWidth: theme.spacing(3),
            minHeight: theme.spacing(3),
            padding: theme.spacing(0),
            fontSize: theme.spacing(2),
            '> .MuiSvgIcon-root': {
              width: theme.spacing(1.75),
              minWidth: theme.spacing(1.75),
              height: theme.spacing(1.75),
              minHeight: theme.spacing(1.75),
            },
          },
        },
        {
          props: { color: 'primary' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.iconButton.primary.text,
            border: `1px solid ${theme.palette._components.button.primary.contained}`,
            '&:hover': { backgroundColor: theme.palette._components.iconButton.primary.hover },
            '&.Mui-focusVisible': {
              borderColor: 'transparent',
              backgroundColor: theme.palette._components.iconButton.primary.focused,
              color: theme.palette._components.iconButton.primary.focusedIcon,
            },
            '&:active': {
              backgroundColor: theme.palette._components.iconButton.primary.focused,
              borderColor: theme.palette._components.button.primary.contained,
            },
          },
        },
        {
          props: { color: 'secondary' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.iconButton.secondary.text,
            border: `1px solid ${theme.palette._components.button.secondary.border}`,
            '&:hover': {
              backgroundColor: theme.palette._components.iconButton.secondary.hover,
            },
            '&.Mui-focusVisible': {
              borderColor: 'transparent',
              backgroundColor: theme.palette._components.iconButton.secondary.focused,
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.secondary.pressed,
            },
          },
        },
        {
          props: { color: 'error' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.button.error.focused,
            border: `1px solid ${theme.palette._components.button.error.border}`,
            '&:hover': {
              backgroundColor: theme.palette._components.button.error.outlinedHover,
            },
            '&.Mui-focusVisible': {
              backgroundColor: theme.palette._components.iconButton.error.focused,
            },
            '&:active': {
              backgroundColor: theme.palette._components.iconButton.error.focused,
            },
          },
        },
      ],
    }),
  },
};
