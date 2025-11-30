import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiTextField: Components<Theme & CssVarsTheme>['MuiTextField'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      legend: {
        display: 'none',
      },

      '& .MuiInputLabel-root': {
        marginBottom: theme.spacing(1),
        transform: 'scale(1)',
        position: 'relative',
        color: theme.palette.text.secondary,
      },

      '& .MuiOutlinedInput-root': {
        fieldset: {
          top: 0,
        },
      },

      '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette._components.input.outlined.enabledBorder,
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette._components.input.outlined.hoverBorder,
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
      },
      '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.error.main,
      },
      '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        backgroundColor: theme.palette.action.hover,
        borderColor: theme.palette._components.input.outlined.enabledBorder,
      },
      '& .MuiOutlinedInput-root.Mui-disabled:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette._components.input.outlined.enabledBorder,
      },
      '& .MuiInputBase-input': {
        position: 'relative',
        color: theme.palette.text.primary,
        transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
        lineHeight: theme.spacing(3),
        '&.Mui-disabled': {
          color: theme.palette.text.disabled,
          WebkitTextFillColor: theme.palette.text.disabled,
        },
        // TODO: investigate why this is causing the HTML to crash for Arabic
        // '&::placeholder': {
        //   opacity: 1,
        //   color: theme.palette.text.disabled,
        // },
      },
    }),
  },
  variants: [
    {
      props: { size: 'small' },
      style: ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
          minHeight: theme.spacing(5),
          paddingBlock: theme.spacing(1),
          paddingInline: theme.spacing(2),
          input: {
            padding: 0,
          },
        },
      }),
    },
    {
      props: { size: 'medium' },
      style: ({ theme }) => ({
        '& .MuiOutlinedInput-root': {
          minHeight: theme.spacing(6),
          paddingBlock: theme.spacing(1),
          paddingInline: theme.spacing(2),
          input: {
            padding: 0,
          },
        },
      }),
    },
  ],
};
