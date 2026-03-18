import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

import { palette } from '../palette';
import { shadows } from '../shadows';

//
//

export const MuiAppBar: Components<Theme & CssVarsTheme>['MuiAppBar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      boxShadow: shadows?.[4],
      input: {
        fontSize: 14,
        '&:-webkit-autofill': {
          transitionDelay: '9999s !important',
        },
        '&::-webkit-input-placeholder': {
          opacity: 1,
          color: theme.palette.text.secondary,
        },
        '&::-moz-placeholder': {
          opacity: 1,
          color: theme.palette.text.secondary,
        },
        '&:-ms-input-placeholder': {
          opacity: 1,
          color: theme.palette.text.secondary,
        },
      },
      '& form': {
        margin: 0,
        maxWidth: 564,
        width: '100%',
        '& .MuiFormControl-root': {
          marginTop: 0,
        },
      },
      //
      variants: [
        {
          props: { color: 'primary' },
          style: ({ theme }) => ({
            '& .MuiButtonBase-root.menuIcon > .MuiSvgIcon-root, .MuiButtonBase-root.searchIcon > .MuiSvgIcon-root':
              {
                color: theme.palette.common.white_states.main,
              },
            input: {
              color: theme.palette.primary.contrastText,
              '&::-webkit-input-placeholder': {
                opacity: 1,
                color: theme.palette.primary.contrastText,
              },
              '&::-moz-placeholder': {
                opacity: 1,
                color: theme.palette.primary.contrastText,
              },
              '&:-ms-input-placeholder': {
                opacity: 1,
                color: theme.palette.primary.contrastText,
              },
            },
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  background: theme.palette.common.white_states.focusVisible,
                },
              },
            },
          }),
        },
        {
          props: { color: 'default' },
          style: ({ theme }) => ({
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  background: theme.palette.common.black_states.selected,
                },
              },
            },
          }),
        },
        {
          props: { color: 'secondary' },
          style: ({ theme }) => ({
            '& .MuiButtonBase-root.menuIcon > .MuiSvgIcon-root, .MuiButtonBase-root.searchIcon > .MuiSvgIcon-root':
              {
                color: theme.palette.common.white_states.main,
              },
            input: {
              opacity: 1,
              color: theme.palette.primary.contrastText,
              '&::-webkit-input-placeholder': {
                opacity: 1,
                color: theme.palette.primary.contrastText,
              },
              '&::-moz-placeholder, &:-ms-input-placeholder': {
                opacity: 1,
                color: theme.palette.primary.contrastText,
              },
              '&:-ms-input-placeholder': {
                opacity: 1,
                color: theme.palette.primary.contrastText,
              },
            },
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  background: theme.palette.common.white_states.focus,
                },
              },
            },
          }),
        },
        {
          props: { color: 'inherit' },
          style: ({ theme }) => ({
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                  background: theme.palette.common.black_states.hover,
                },
              },
            },
          }),
        },
        {
          props: { color: 'transparent' },
          style: ({ theme }) => ({
            backgroundColor: palette?.background?.default,
            boxShadow: shadows?.[0],
            borderBottom: `1px solid ${theme.palette?.outlined?.outlined_2}`,
            '& .MuiTextField-root': {
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: theme.palette?.outlined?.outlined,
                  background: theme.palette?.common?.black_states?.hover,
                },
                '&.Mui-focused fieldset': {
                  borderColor: theme.palette.primary.main,
                },
                '&:active fieldset': {
                  borderColor: theme.palette.primary.main,
                },
              },
            },
          }),
        },
      ],
    }),
  },
};
