import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiTimeline: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiTimeline'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      variants: [
        {
          // noOppositeContent is used to remove the opposite content,
          // which is the content that is on the other side of the timeline item depending on the language
          props: { noOppositeContent: true },
          style: {
            [`.MuiTimelineItem-root:before`]: {
              flex: 0,
              padding: 0,
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
      ],
    }),
  },
};
