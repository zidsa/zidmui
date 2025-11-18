import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

export const MuiButton: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiButton'] = {
  defaultProps: {
    disableElevation: true,
    disableRipple: true,
    disableTouchRipple: true,
  },
  styleOverrides: {
    root: ({ theme }) => ({
      textTransform: 'initial',

      // Set default border style and width for all buttons,
      // and handle its color variation with prop variants. (To prevent jumping buttons)
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: theme.spacing(45),

      // Truncate text with ellipsis if it overflows the button width
      display: 'flex',
      textAlign: 'center',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',

      '&.MuiButton-loading': {
        color: 'rgba(0,0,0,0) !important',
        display: 'flex',
      },

      '&.MuiButton-loading.MuiButton-sizeMedium .MuiButton-loadingIndicator .MuiCircularProgress-root':
        {
          width: '20px !important',
          height: '20px !important',
        },

      '&.MuiButton-loading.MuiButton-sizeLarge .MuiButton-loadingIndicator .MuiCircularProgress-root':
        {
          width: '24px !important',
          height: '24px !important',
        },

      variants: [
        {
          props: { size: 'large' },
          style: {
            minWidth: theme.spacing(15.25),
            maxHeight: theme.spacing(6),
            minHeight: theme.spacing(6),
            fontSize: theme.spacing(2),
            padding: `${theme.spacing(1.25)} ${theme.spacing(2)}`,
            lineHeight: theme.spacing(3.25),
            fontWeight: theme.typography.fontWeightRegular,
            '&.Mui-focusVisible': {
              outline: `2px solid ${theme.palette.primary.dark}`,
              outlineOffset: '2px',
            },
          },
        },
        {
          props: { size: 'medium' },
          style: {
            padding: `${theme.spacing(0.875)} ${theme.spacing(2)}`,
            minWidth: theme.spacing(13),
            maxHeight: theme.spacing(5),
            minHeight: theme.spacing(5),
            lineHeight: theme.spacing(3),
            fontSize: theme.spacing(1.75),
            fontWeight: theme.typography.fontWeightRegular,
            '&.Mui-focusVisible': {
              outline: `2px solid ${theme.palette.primary.dark}`,
              outlineOffset: '2px',
            },
          },
        },
        {
          props: { size: 'small' },
          style: {
            padding: `${theme.spacing(0.5)} ${theme.spacing(2)}`,
            minWidth: theme.spacing(9),
            maxHeight: theme.spacing(4),
            minHeight: theme.spacing(4),
            lineHeight: theme.spacing(2.75),
            fontSize: theme.spacing(1.5),
            fontWeight: theme.typography.fontWeightRegular,
            '&.Mui-focusVisible': {
              outline: `2px solid ${theme.palette.primary.dark}`,
              outlineOffset: '2px',
            },
          },
        },
        {
          props: { color: 'primary' },
          style: {
            backgroundColor: theme.palette._components.button.primary.contained,
            color: theme.palette._components.button.primary.text,
            borderColor: theme.palette._components.button.primary.contained,
            '&:hover': {
              backgroundColor: theme.palette._components.button.primary.hover,
              borderColor: theme.palette._components.button.primary.hover,
            },
            '&.Mui-focusVisible': {
              backgroundColor: theme.palette._components.button.primary.focused,
              outline: `2px solid ${theme.palette.primary.dark}`,
              outlineOffset: '2px',
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.primary.pressed,
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette._components.button.primary.disabled,
              borderColor: theme.palette._components.button.disabledBorder,
              color: theme.palette._components.button.disabledText,
            },
          },
        },
        {
          props: { color: 'primaryLight' },
          style: {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.common.black,
            borderColor: theme.palette.primary.light,
            '&:hover': {
              backgroundColor: theme.palette._components.button.primary.hover,
              borderColor: theme.palette._components.button.primary.hover,
              color: theme.palette._components.button.primary.text,
            },
            '&.Mui-focusVisible': {
              backgroundColor: theme.palette._components.button.primary.focused,
              outline: `2px solid ${theme.palette.primary.dark}`,
              outlineOffset: '2px',
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.primary.pressed,
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette._components.button.primary.disabled,
              borderColor: theme.palette._components.button.disabledBorder,
              color: theme.palette._components.button.disabledText,
            },
          },
        },
        {
          props: { color: 'secondary' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.button.secondary.text,
            borderColor: theme.palette._components.button.secondary.border,
            '&:hover': { backgroundColor: theme.palette._components.button.secondary.hover },
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
              borderColor: theme.palette._components.button.secondary.border,
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.secondary.pressed,
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
              borderColor: theme.palette._components.button.disabledBorder,
              color: theme.palette._components.button.disabledText,
            },
          },
        },
        {
          props: { color: 'secondary', variant: 'text' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.button.secondary.text,
            borderColor: 'transparent',
            '&:hover': { backgroundColor: theme.palette._components.button.secondary.hover },
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.secondary.pressed,
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              color: theme.palette._components.button.disabledText,
            },
          },
        },
        {
          props: { color: 'primaryDark', variant: 'text' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.button.primaryDarkText.text,
            borderColor: 'transparent',
            '&:hover': {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            },
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            },
            '&:active': {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              color: theme.palette._components.button.primaryDarkText.disabled,
            },
          },
        },
        {
          props: { color: 'error', variant: 'contained' },
          style: {
            backgroundColor: theme.palette._components.button.error.contained,
            color: theme.palette._components.button.error.text,
            borderColor: theme.palette._components.button.error.border,
            '&:hover': { backgroundColor: theme.palette._components.button.error.hover },
            '&.Mui-focusVisible': {
              backgroundColor: theme.palette._components.button.error.focused,
              color: theme.palette.common.white,
              borderColor: 'transparent',
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.error.pressed,
              borderColor: theme.palette._components.button.error.activeBorder,
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette._components.button.secondary.disabled,
              borderColor: theme.palette._components.button.disabledBorder,
              color: theme.palette._components.button.disabledText,
            },
          },
        },
        {
          props: { color: 'error', variant: 'outlined' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.button.error.outlinedText,
            borderColor: theme.palette._components.button.error.border,
            '&:hover': { backgroundColor: theme.palette._components.button.error.outlinedHover },
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.error.pressed,
              borderColor: theme.palette._components.button.error.border,
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
              borderColor: theme.palette._components.button.disabledBorder,
              color: theme.palette._components.button.disabledText,
            },
          },
        },
        {
          props: { color: 'error', variant: 'text' },
          style: {
            backgroundColor: 'transparent',
            color: theme.palette._components.button.error.outlinedText,
            borderColor: 'transparent',
            '&:hover': { backgroundColor: theme.palette._components.button.error.outlinedHover },
            '&.Mui-focusVisible': {
              backgroundColor: 'transparent',
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.error.pressed,
            },
            '&.Mui-disabled': {
              backgroundColor: 'transparent',
              borderColor: 'transparent',
              color: theme.palette._components.button.disabledText,
            },
          },
        },
        {
          props: { color: 'tertiary', variant: 'contained' },
          style: {
            backgroundColor: theme.palette._components.button.tertiary.contained,
            color: theme.palette._components.button.tertiary.text,
            borderColor: 'transparent',
            boxShadow: '0px 1px 2px 0px #1018280D, 0px 1px 3px 0px #1018280D',
            '&:hover': { backgroundColor: theme.palette._components.button.tertiary.hover },
            '&.Mui-focusVisible': {
              backgroundColor: theme.palette._components.button.tertiary.focused,
              borderColor: 'transparent',
            },
            '&:active': {
              backgroundColor: theme.palette._components.button.tertiary.pressed,
            },
            '&.Mui-disabled': {
              backgroundColor: theme.palette._components.button.secondary.disabled,
              borderColor: theme.palette._components.button.disabledBorder,
              color: theme.palette._components.button.disabledText,
            },
          },
        },
      ],
      transition: theme.transitions.create(['border-color', 'background-color'], {
        easing: theme.transitions.easing.easeInOut,
        duration: theme.transitions.duration.standard,
      }),
    }),
  },
};
