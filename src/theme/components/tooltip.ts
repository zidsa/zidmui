import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiTooltip: Components<Theme & CssVarsTheme>['MuiTooltip'] = {
  defaultProps: {},
  styleOverrides: {
    tooltip: ({ theme }) => {
      return {
        backgroundColor: theme.palette.colors.neutral[1000],
        paddingBlock: theme.spacing(1),
        paddingInline: theme.spacing(1.5),
      };
    },
    arrow: ({ theme }) => {
      return { color: theme.palette.colors.neutral[1000] };
    },
  },
};
