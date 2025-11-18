import { Components, CssVarsTheme, Theme } from '@mui/material/styles';

//
//

export const MuiChip: Components<Theme & CssVarsTheme>['MuiChip'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      minWidth: theme.spacing(7.5),
      variants: [
        {
          props: { size: 'small' },
          style: {
            fontSize: '0.75rem',
            lineHeight: '1.125rem',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            fontSize: '0.75rem',
            lineHeight: '1.125rem',
          },
        },
      ],
    }),
  },
};
