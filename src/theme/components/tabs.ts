import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiTabs: Components<Theme & CssVarsTheme>['MuiTabs'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      minHeight: theme.spacing(5.25),

      '.MuiTab-root': {
        textTransform: 'none',
        minHeight: theme.spacing(5.25),
        borderRadius: theme.spacing(1),
        minWidth: 100,
        lineHeight: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: 400,
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),

        '& .Mui-selected': {
          color: theme.palette.primary.main,
        },

        '& .Mui-disabled': {
          color: theme.palette.text.disabled,
        },
      },

      variants: [
        {
          props: { textColor: 'primary' },
          style: {
            '.Mui-selected': {
              color: theme.palette.text.primary,
            },

            ' .Mui-disabled': {
              color: theme.palette.text.disabled,
            },
          },
        },
        {
          props: { textColor: 'secondary' },
          style: {
            '.MuiTab-root': {
              color: theme.palette.text.secondary,
              minHeight: theme.spacing(5.25),
            },

            '.MuiButtonBase-root.Mui-selected': {
              backgroundColor: theme.palette.background.gray100,
              color: theme.palette.tabs.text.secondary,
            },

            ' .Mui-disabled': {
              color: theme.palette.text.disabled,
            },

            '.Mui-disabled': {
              color: theme.palette.text.disabled,
            },

            '.MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
          },
        },
        {
          props: { orientation: 'vertical', textColor: 'primary' },
          style: {
            '.MuiTab-root': {
              maxWidth: '100%',
            },

            '.Mui-selected': {
              color: theme.palette.primary.main,
            },

            '.Mui-disabled': {
              color: theme.palette.text.disabled,
            },
          },
        },
        {
          props: { orientation: 'vertical', textColor: 'secondary' },
          style: {
            '.MuiTab-root': {
              color: theme.palette.text.secondary,
              maxWidth: '100%',
            },

            '.MuiButtonBase-root.Mui-selected': {
              backgroundColor: theme.palette.background.gray100,
              color: theme.palette.tabs.text.secondary,
            },

            '.Mui-disabled': {
              color: theme.palette.text.disabled,
            },

            '.MuiTabs-indicator': {
              backgroundColor: 'transparent',
            },
          },
        },
      ],
    }),
  },
};
