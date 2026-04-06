import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiSelect: Components<Theme & CssVarsTheme>['MuiSelect'] = {
  styleOverrides: {
    icon: ({ theme }) => ({
      '&.MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
      },
    }),
    select: ({ theme }) => ({
      '&.MuiSelect-outlined': {
        '&.MuiInputBase-input': {
          '&.MuiOutlinedInput-input': {
            padding: theme.spacing(1, 5, 1, 2),
            boxSizing: 'border-box',
            minHeight: theme.spacing(6),
            display: 'flex',
            alignItems: 'center',
          },

          '&.MuiInputBase-inputSizeSmall': {
            minHeight: theme.spacing(5),
          },

          '&.MuiInputBase-inputAdornedStart': {
            padding: theme.spacing(1, 5, 1, 0),
          },
        },
      },
    }),
  },
};
