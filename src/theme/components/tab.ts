import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiTab: Components<Theme & CssVarsTheme>['MuiTab'] = {
  defaultProps: {
    disableFocusRipple: true,
    disableRipple: true,
    disableTouchRipple: true,
  },
};
