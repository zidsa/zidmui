import type {} from '@mui/lab/themeAugmentation';
import { Components, CssVarsTheme, Theme } from '@mui/material';

//
//

export const MuiSkeleton: Components<
  Omit<Theme, 'components' | 'palette'> & CssVarsTheme
>['MuiSkeleton'] = {
  defaultProps: {
    animation: 'wave',
  },
};
