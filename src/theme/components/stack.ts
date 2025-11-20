import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiStack: Components<Theme & CssVarsTheme>['MuiStack'] = {
  defaultProps: {
    useFlexGap: true,
  },
  styleOverrides: {
    root: {
      // NOTE: The MUI Stack component adds a left margin to all its children,
      // which can be inconvenient when using the 'gap' property.
      // To avoid manually setting the left margin to 0 each time,
      // we remove the left margin and rely solely on the gap property for spacing.
      '>:not(style)~:not(style)': {
        marginLeft: 0,
      },
      gap: '8px',
    },
  },
};
